import { Transaction, FundAddress, ETxStatus } from './models';

export function createSession(captcha: string): Promise<{ sessionToken: string, clientConfig: any }> {
	return fetch(`/api/createSession?captcha=${captcha}`)
	.then(response => response.json()) as Promise<{ sessionToken: string, clientConfig: any }>;
}

export function sendTargetAddress(sessionToken: string, targetAddress: string): Promise<{ fundAddresses: Array<FundAddress> }> {
	return fetch(`/api/sendTargetAddress?sessionToken=${sessionToken}&targetAddress=${targetAddress}`)
	.then(response => response.json()) as Promise<{ fundAddresses: Array<FundAddress> }>;
}

export function loadTransactions(sessionToken: string, targetAddress: string): Promise<{ transactions: Array<Transaction> }> {
	return fetch(`/api/loadTransactions?sessionToken=${sessionToken}&targetAddress=${targetAddress}`)
	.then(response => response.json())
	.then(response => {
		response.transactions.forEach((tr: Transaction) => tr.status = ETxStatus[tr.status]);
		return response;
	})
	.then(ttt => {
		console.log('#@E!@#$!@#$', ttt);
		return ttt;
	});
}
