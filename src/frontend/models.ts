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
    PENDING,
    VERIFIED,
    FINAL
}

export enum EContributeSteps {
    CONTRIBUTE_START,
    WHERE_TO_SEND_FUNDS,
    SEND_FUNDS
}

export enum ECheckBalanceSteps {
    CHECK_BALANCE_START,
    CHECK_WALLET,
    VIEW_WALLET_HISTORY
}

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
