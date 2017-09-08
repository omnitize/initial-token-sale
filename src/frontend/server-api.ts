import { ETxStatus, Transaction, FundAddresses } from './models';


export function createSession(captcha: string): Promise<{ sessionToken: string }> {
	return fetch(`/api/createSession?captcha=${captcha}`)
	.then(response => response.json()) as Promise<{ sessionToken: string }>;
}


export function sendTargetAddress(sessionToken: string, targetAddress: string): Promise<{ fundAddresses: FundAddresses }> {
	return fetch(`/api/sendTargetAddress?sessionToken=${sessionToken}&targetAddress=${targetAddress}`)
	.then(response => response.json()) as Promise<{ fundAddresses: FundAddresses }>;
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
			status: ETxStatus.PENDING
		},
		{
			datetime: new Date(),
			value: 18.01,
			currency: 'Ether',
			price: 0.01,
			tokens: 16.008,
			status: ETxStatus.FINAL
		},
	];
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ transactions });
		}, 300);
	});
}
