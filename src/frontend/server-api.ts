
import * as Promise from 'bluebird';

import { TxStatus, Transaction } from './state';


export function createSession(captcha: string): Promise<{ sessionToken: string }> {
	console.log('createSession', captcha);
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ sessionToken: '1234' });
		}, 300);
	});
}


export function sendTargetAddress(sessionToken: string, targetAddress: string): Promise<{ fundAddresses: Map<string, string> }> {
	console.log('sendTargetAddress', sessionToken, targetAddress);
	const fundAddresses = new Map<string, string>();
	fundAddresses.set('BitCoin', '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX');
	fundAddresses.set('Ether', '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe');
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ fundAddresses });
		}, 300);
	});
}

export function loadTransactions(sessionToken: string, targetAddress: string): Promise<{ transactions: Array<Transaction> }> {
	console.log('loadTransactions', sessionToken, targetAddress);
	const transactions: Array<Transaction> = [
		{
			datetime: new Date(),
			value: 13.3,
			currency: 'BitCoin',
			price: 0.003,
			tokens: 0,
			status: TxStatus.PENDING
		},
		{
			datetime: new Date(),
			value: 18.01,
			currency: 'Ether',
			price: 0.01,
			tokens: 16.008,
			status: TxStatus.FINAL
		},
	];
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ transactions });
		}, 300);
	});
}
