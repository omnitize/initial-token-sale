export interface IDictionary<T> {
    [key: string]: T
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
    PENDING = 'PENDING',
    CONFIRMED = 'CONMFIRMED',
    PAID = 'PAID'
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
    created: Date;
    value: number;
    currency: string;
    price: number;
    discountPerc: number;
    confirmations: number;
    tokensEarned: number;
    tokensPaid: number;
    status: ETxStatus;
}

export class FundAddress { 
    currency: string; 
    address: string;
    price: number 
}

export class State {

    sessionToken: string = null;
    clientConfig: any;

    selectedUseCase: EUserFlow = EUserFlow.CONTRIBUTE;
    currentStep: number = 0;
    currentSubStep: number = -1;
    currentSubStepMounted: number = -1;

    validationCheckboxError: string = "";
    validationTextError: string = "";

    isDoubleCheckedAddress: boolean = false;

    isWrittenMnemonicPhrase: boolean = false;

    alreadyHaveWallet: boolean = true;

    targetAddress: string = "";

    targetMnemonicPhrase: string | null = "";
    
    targetWallet: string | null = "";

    fundAddresses: Array<FundAddress> = [];

    transactions: Array<Transaction> = [];

    isLoading: boolean = false;
}

export interface IShadeStyle {
    [type: string]: string
}

export interface ICaptchaSuccessParams {
    sessionToken: string
    clientConfig: any
}
