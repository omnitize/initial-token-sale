
export enum EUserFlow {
	CONTRIBUTE,
	CHECK_BALANCE
};

export enum ETxStatus {
	PENDING,
	VERIFIED,
	FINAL
};

export class Transaction {
	datetime: Date;
	value: number;
	currency: string;
	price: number;
	tokens: number;
	status: ETxStatus;
}

export type FundAddresses = { [key: string]: string };

export class State {

	useCase: EUserFlow;
	stepNumber: number;

	sessionToken: string;

	alreadyHaveWallet: boolean;

	targetAddress: string;
	targetMnemonicPhrase: string;
	targetWallet: string;

	fundAddresses: FundAddresses;

	transactions: Array<Transaction>;
};

export const state = new State();
