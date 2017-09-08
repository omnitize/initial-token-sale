import * as Promise from 'bluebird';
import { config } from './config';
import { query } from './database';
const fetch = require('node-fetch');
const FormData = require('form-data');
const crypto = require('crypto');

class EtherScanTransaction {
	blockNumber: string;
	blockHash: string;
	timeStamp: string;
	hash: string;
	from: string;
	to: string;
	value: string;
	confirmations: string;
	isError: string; // 0 for no
};

function listTransactionsByAddress(address: string): Promise<Array<EtherScanTransaction>> {
	fetch(`http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${config.etherScanApiKey}`)
	.then(response => response.json())
	.then(response => {
		if(response.status != '1') throw new Error('EtherScan returned an error: ' + response.message);
		return response.result as Array<EtherScanTransaction>;
	});
}

function writeTransactionsToDatabase(targetAddress: string, transactions: Array<EtherScanTransaction>): Promise<void> {
	return transactions.map(tr => {
		const status = tr.isError != '0' ? 'error' : tr.confirmations >= config.etherMinimumConfirmations ? 'confirmed' ? 'pending';
		return Promise.resolve()
		.then(() => query('select confirmations, status from transactions where native_txid=?', [ tr.hash ]))
		.then((results: any) => {
			if(results.length == 0) {
				return query(
					`insert into transactions 
						( native_txid, currency, value, price, discount_perc, address_to, address_from, target_address, confirmations ) 
						values 
						(?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
					[ 
						tr.hash, 'ether', tr.value, config.tokenPriceInEther, config.tokenDiscountPercent, 
						tr.to, tr.from, targetAddress, tr.confirmations 
					]
				);
			} else {
				if(tr.isError && results[0].status == 'pending') {
					return query('update transactions set status=?', [ 'error' ]);
				}
				if(results[0].confirmations != tr.confirmations && tr.confirmations < config.etherMinimumConfirmations) {
					return query('update transactions set confirmations=?', [ tr.confirmations ]);
				}
			}
		});
	});
}

function getActiveAddresses(): Promise<Array<{ address: string, targetAddress: string }>> {
	return query('select target_address, ether from addresses where session_id is not NULL')
	.then(response.map((r.any) => ({ address: r.ether, targetAddress: r.targetAddress }) ));
}

function processAddress(address: string): Promise<void> {
	return Promise.resolve()
	.then(() => listTransactionsByAddress(address))
	.then((transactions) => writeTransactionsToDatabase(transactions));
}

function etherRunner() {
	return Promise.resolve()
	.then(() => getActiveAddresses())
	.then((addresses: Array<{ address: string, targetAddress: string }>) => {
		let p = Promise.resolve();
		addresses.forEach(({ address, targetAddress }) => {
			p = p.then(() => listTransactionsByAddress(address))
			.then((transactions: Array<EtherScanTransaction>) => writeTransactionsToDatabase(targetAddress, transactions))
			.catch((error: any) => console.log(error))
			.wait(100);
		});
		return p;
	});
}




