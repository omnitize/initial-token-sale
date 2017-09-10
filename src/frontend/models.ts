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

export enum EWhereToSendFundsSubSteps {
    ALREADY_HAVE_WALLET,
    CREATE_WALLET
}

export enum ECheckWalletSubSteps {
    RECLAIM_WALLET
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
    currentSubStep: number = -1;
    currentSubStepMounted: number = -1;

    walletAddress: string = "";

    pmnemonicPhrase: string = "";

    isDoubleCheckedAddress: boolean = false;

    isWrittenMnemonicPhrase: boolean = false;

    alreadyHaveWallet: boolean = true;

    targetAddress: string | null = null;

    targetBIP39: string | null = null;
    targetWallet: string | null = null;

    fundAddresses: FundAddresses = {};

    transactions: Array<Transaction> = [];
}
