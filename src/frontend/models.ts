export interface IUseCase {
    name: string
    steps: IStep[]
}

export interface IStep {
    name: string
    component: JSX.Element
}

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

export class State {

    useCase: EUserFlow;
    stepNumber: number;

    captchaToken: string;

    alreadyHaveWallet: boolean;

    targetAddress: string;

    targetBIP39: string;
    targetWallet: string;

    fundAddresses: Map<string, string>;

    transactions: Array<Transaction>;
};
