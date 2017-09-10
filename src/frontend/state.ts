import {
    EContributeSteps, ECheckBalanceSteps, EUserFlow, State, EWhereToSendFundsSubSteps,
    ECheckWalletSubSteps
} from './models';
import { Main } from './containers/main';
const bip39 = require('bip39');
const Wallet = require('ethereumjs-wallet');
const hdkey = require('ethereumjs-wallet/hdkey');

let state = new State();
let appRoot: Main;

export function registerAppRoot(root: Main) {
    appRoot = root;
}

type Partial<T> = {
    [P in keyof T]?: T[P];
}

export function setState(newState: Partial<State>) {
    console.log('setState', state, newState);
    Object.assign(state, newState);
    appRoot.setState(state);
}

export function createWallet(mnemonicPhrase?: string) {

    if(!mnemonicPhrase) {
        mnemonicPhrase = bip39.generateMnemonic();
    }

    const wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonicPhrase)).getWallet();
    const v3String = wallet.toV3String('password');
    const address = wallet.getAddressString();
       
    setState({
        targetAddress: address,
        targetMnemonicPhrase: mnemonicPhrase,
        targetWallet: v3String
    });
}

export function checkMnemonic(mnemonicPhrase: string): boolean {
    return bip39.validateMnemonic(mnemonicPhrase);
}

export function incrementStep() {
    const max = maxSteps();
    const nextStep = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setState({ currentStep: nextStep });
}

export function setStep(nextStep: number) {
    setState({ currentStep: nextStep });
}

export function incrementSubStep() {
    const max = maxSubSteps();
    const nextSubStep = state.currentSubStep === max ? state.currentSubStep : state.currentSubStep + 1;
    setState({ currentSubStep: nextSubStep });
}

export function setSubStep(nextSubStep: number) {
    setState({ currentSubStep: nextSubStep });
}

export function setSubStepMounted(nextSubStepMounted: number) {
    setTimeout(() => setState({ currentSubStepMounted: nextSubStepMounted }), 0);
    // creates enough delay to register as CSS transition
}

const maxSteps = () => {
    const stepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EContributeSteps : ECheckBalanceSteps;
    return Object.keys(stepEnum).length / 2
};

const maxSubSteps = () => {
    const subStepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EWhereToSendFundsSubSteps : ECheckWalletSubSteps;
    return Object.keys(subStepEnum).length / 2
};
