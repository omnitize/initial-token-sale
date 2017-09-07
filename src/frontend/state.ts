import {
    EContributeSteps, ECheckBalanceSteps, EUserFlow, State, EWhereToSendFundsSubSteps,
    ECheckWalletSubSteps
} from './models';
import { Main } from './containers/main';

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

export function incrementStep() {
    const max = maxSteps();
    const nextStep = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setState({ currentStep: nextStep });
}

export function setStep(step: number) {
    setState({ currentStep: step });
}

export function incrementSubStep() {
    const max = maxSubSteps();
    console.log(max);
    const nextSubStep = state.currentSubStep === max ? state.currentSubStep : state.currentSubStep + 1;
    setState({ currentSubStep: nextSubStep });
}

export function setSubStep(step: number) {
    setState({ currentSubStep: step });
}

const maxSteps = () => {
    const stepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EContributeSteps : ECheckBalanceSteps;
    return Object.keys(stepEnum).length / 2
};

const maxSubSteps = () => {
    const subStepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EWhereToSendFundsSubSteps : ECheckWalletSubSteps;
    return Object.keys(subStepEnum).length / 2
};
