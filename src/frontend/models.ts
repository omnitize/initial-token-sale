export interface IUseCase {
    name: string
    steps: IStep[]
}

export interface IStep {
    name: string
    component: JSX.Element
    subComponents?: JSX.Element[]
}

export enum EUserFlow {
    CONTRIBUTE,
    CHECK_BALANCE
}

export enum ETxStatus {
    pending,
    confirmed,
    paid,
    error
}

export class Transaction {
    created: Date;
    value: number;
    currency: string;
    price: number;
    tokensEarned: number;
    tokensPaid: number;
    status: ETxStatus;
    verifications: number;
}

export type FundAddresses = { [key: string]: string };

export class State {

    sessionToken: string = null;

    selectedUseCase: EUserFlow = EUserFlow.CONTRIBUTE;
    currentStep: number = 0;

    alreadyHaveWallet: boolean = true;

    targetAddress: string = null;

    targetBIP39: string = null;
    targetWallet: string = null;

    fundAddresses: FundAddresses = {};

    transactions: Array<Transaction> = [];
}
