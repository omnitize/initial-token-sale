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

export function setState(newState: Partial<State>) {
    console.log('setState', state, newState);
    Object.assign(state, newState);
    appRoot.setState(state);
}

export {
    createWallet,
    checkMnemonic
} from "./wallet";

export {
    typeWalletAddress,
    typePnemonicPhrase,
    checkDoubleCheckedAddress,
    checkWrittenMnemonicPhrase
} from "./inputs";

export {
    incrementStep,
    setStep,
    incrementSubStep,
    setSubStep,
    setSubStepMounted
} from "./navigation";