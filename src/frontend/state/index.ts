import { State
} from '../models';
import { Main } from '../containers/main';

export let state = new State();
let appRoot: Main;

export function registerAppRoot(root: Main) {
	appRoot = root;
}

type Partial<T> = {
    [P in keyof T]?: T[P];
}

export function setNextState(stateUpdate: Partial<State>) {
    console.log('setNextState', state, stateUpdate);
    const nextState = Object.assign(state, stateUpdate);
    updateHistory(nextState, stateUpdate);
    appRoot.setState(nextState);
}

function updateHistory(nextState, stateUpdate) {
    if ("currentStep" in stateUpdate) {
        window.history.pushState(nextState, `step-${stateUpdate.currentStep}`, `/`);
    } else if ("currentSubStep" in stateUpdate) {
        window.history.pushState(nextState, `sub-step-${stateUpdate.currentSubStep}`, `/`);
    }
}

export function setStateFromHistory(stateUpdate: Partial<State>) {
    console.log('setNextState', state, stateUpdate);
    const nextState = Object.assign(state, stateUpdate);
    appRoot.setState(nextState);
}

export {
    createWallet,
    checkMnemonic
} from "./wallet";

export {
    typeWalletAddress,
    typeMnemonicPhrase,
    checkDoubleCheckedAddress,
    checkWrittenMnemonicPhrase,
    changeTextValidationError,
    changeTextValidationError2,
    changeCheckValidationError
} from "./inputs";

export {
    goBackInPage,
    goForwardInPage,
    setStep,
    incrementStep,
    incrementSubStep,
    setSubStep,
    setSubStepMounted,
    setSubStepUnmounted,
    maxSteps,
    maxSubSteps
} from "./navigation";

export {
    checkBalanceStartCaptchaSuccess,
    reclaimWalletContinue
} from "./check-balance";

export {
    contributeStartCaptchaSuccess,
    alreadyHaveWalletContinue,
    createWalletContinue
} from "./contribute";
