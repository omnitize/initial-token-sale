import { State } from './models';
import { Main } from './containers/main';

export const state = new State();

let appRoot: Main;

export function registerAppRoot(root: Main) {
	appRoot = root;
}

export function setState(state: any) {
	appRoot.setState(state);
}

export function incrementStep() {
	setState({ stepNumber: state.stepNumber+1 });
}