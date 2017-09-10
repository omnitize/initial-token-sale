import * as Promise from 'bluebird';
import { config } from '../config';
import { query } from '../database';
const fetch = require('node-fetch');

class EtherScanTransaction {
	blockNumber: number;
	blockHash: string;
	timeStamp: number;
	hash: string;
	from: string;
	to: string;
	value: number;
	confirmations: number;
	isError: boolean;
};

function listTransactionsByAddress(address: string): Promise<Array<EtherScanTransaction>> {
	return fetch(`http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${config.etherScanApiKey}`)
	.then((response: any) => response.json())
	.then((response: any) => {
		if(response.status != '1') throw new Error('EtherScan returned an error: ' + response.message);
		return response.result.map((t: any) => ({
			blockNumber: parseInt(t.blockNumber),
			blockHash: t.blockHash,
			timeStamp: parseInt(t.timeStamp),
			hash: t.hash,
			from: t.from,
			to: t.to,
			value: parseInt(t.value),
			confirmations: parseInt(t.confirmations),
			isError: t.isError != '0'
		}));
	});
}

function writeTransactionsToDatabase(targetAddress: string, transactions: Array<EtherScanTransaction>): Promise<void> {
	return Promise.all(transactions.map(tr => {
		const status = tr.isError ? 'error' : tr.confirmations >= config.etherMinimumConfirmations ? 'confirmed' : 'pending';
		return Promise.resolve()
		.then(() => query('select confirmations, status from transactions where native_txid=?', [ tr.hash ]))
		.then((results: any) => {
			if(results.length == 0) {
				return query(
					`insert into transactions 
						( native_txid, currency, value, price, discount_perc, address_to, address_from, target_address, confirmations, status ) 
						values 
						(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
					[ 
						tr.hash, 'ether', tr.value, config.tokenPriceInEther, config.tokenDiscountPercent, 
						tr.to, tr.from, targetAddress, tr.confirmations, status
					]
				);
			} else {
				if(tr.isError) {
					return query('update transactions set status=?', [ 'error' ]);
				}
				if(results[0].confirmations != tr.confirmations) {
					return query('update transactions set confirmations=?', [ tr.confirmations ]);
				}
			}
		})
		.catch((error: any) => {
			console.log(error);
		});
	}))
	.then(() => null);
}

function getActiveAddresses(): Promise<Array<{ address: string, targetAddress: string }>> {
	return query('select * from omnitize_dev.addresses, omnitize_dev.sessions where addresses.session_id=sessions.session_id', [])
	.then((response: Array<any>) => response.map((r: any) => ( { address: r.ether, targetAddress: r.targetAddress } ) ));
}

function etherRunner() {
	console.log('etherRunner starting iteration');
	return Promise.resolve()
	.then(() => getActiveAddresses())
	.then((addresses: Array<{ address: string, targetAddress: string }>) => {
		console.log('etherRunner, addresses: ', addresses);
		let p = Promise.resolve();
		addresses.forEach(({ address, targetAddress }) => {
			p = p.then(() => listTransactionsByAddress(address))
			.then((transactions: Array<EtherScanTransaction>) => {
				console.log('etherRunner, address: ', address, ', transactions: ', transactions);
				writeTransactionsToDatabase(targetAddress, transactions);
			})
			.catch((error: any) => {
				console.log(error);
			})
			.delay(100);
		});
		return p;
	})
	.catch((error) => {
		console.log(error);
	})
	.then(() => {
		setTimeout(etherRunner, 1000);
	});
}

etherRunner();


