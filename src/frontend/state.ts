
export enum UserFlow {
	CONTRIBUTE,
	CHECK_BALANCE
};

export enum TxStatus {
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
	status: TxStatus;
}

export type FundAddresses = { [key: string]: string };

export class State {

	useCase: UserFlow;
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
