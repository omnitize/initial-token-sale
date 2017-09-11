import { setState, state } from './index'

import {
    EContributeSteps, ECheckBalanceSteps, EUserFlow, EWhereToSendFundsSubSteps,
    ECheckWalletSubSteps
} from '../models';

// s t e p s
export function incrementStep() {
    const max = maxSteps();
    const nextStep = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setState({ currentStep: nextStep });
}

export function setStep(nextStep: number) {
    setState({ currentStep: nextStep });
}

// s u b - s t e p s
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