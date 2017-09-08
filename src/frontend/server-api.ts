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
	return fetch(`/api/loadTransactions?sessionToken=${sessionToken}&targetAddress=${targetAddress}`)
	.then(response => response.json())
	.then(array => array.map((r: any) => ({
	    created: r.created,
    	value: r.value,
    	currency: r.currency,
    	price: r.price,
    	tokensEarned: r.tokens_earned,
    	tokensPaid: r.tokens_paid,
    	status: ETxStatus[r.status],
    	verifications: r.verifications		
	}))) as Promise<{ transactions: Array<Transaction> }>;
}
