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

export function setState(nextState: Partial<State>) {
    const prevState: State = state;
    console.log('setState', state, nextState);
    Object.assign(state, nextState);
    appRoot.setState(state);
    updateHistory(prevState, nextState, state);
}

function updateHistory(prevState, nextState, state) {
    if (prevState.currentStep !== nextState.currentStep) {
        window.history.pushState(state, `step-${nextState.currentStep}`, `/`);
    } else if (prevState.currentSubStep !== nextState.currentSubStep) {
        window.history.pushState(state, `sub-step-${nextState.currentSubStep}`, `/`);
    }
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
    changeCheckValidationError
} from "./inputs";

export {
    incrementStep,
    setStep,
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
