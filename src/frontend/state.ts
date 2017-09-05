
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

export class State {

	useCase: UserFlow;
	stepNumber: number;

	captchaToken: string;

	alreadyHaveWallet: boolean;

	targetAddress: string;

	targetBIP39: string;
	targetWallet: string;

	fundAddresses: Map<string, string>;

	transactions: Array<Transaction>;
};

export const state = new State();
