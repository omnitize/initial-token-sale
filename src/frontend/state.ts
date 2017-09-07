import { State } from './models';
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
    setState({ currentStep: state.currentStep + 1 });
}

export function setStep(step: number) {
    setState({ currentStep: step });
}

export function incrementSubStep() {
    setState({ currentSubStep: state.currentSubStep + 1 });
}

export function setSubStep(step: number) {
    setState({ currentSubStep: step });
}
