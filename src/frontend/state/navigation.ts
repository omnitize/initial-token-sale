import { setNextState, setStateFromHistory, state } from './index'

let timeoutId: any;

import {
    EContributeSteps, ECheckBalanceSteps, EUserFlow, EWhereToSendFundsSubSteps,
    ECheckWalletSubSteps
} from '../models';

// n a v i g a t e  h i s t o r y

export function goBackInPage() {
    if (window && window.history.state)  {
        window.history.back();
    }
}

export function goForwardInPage() {
    if (window && window.history.state)  {
        window.history.forward();
    }
}

export function navigateHistory(e: PopStateEvent) {
    const isBackHistory = {
        isBackHistory: e.state.currentStep < state.currentStep || e.state.currentSubStep <= state.currentSubStep
    };
    setStateFromHistory({...e.state, isBackHistory});
}

// s t e p s

export function incrementStep() {
    const max = maxSteps();
    const nextStep = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setStep(nextStep);
}

export function setStep(nextStep: number) {
    resetScroll();
    setNextState({
        isHistory: true,
        currentStep: nextStep,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });
}

// s u b - s t e p s

export function incrementSubStep() {
    const max = maxSubSteps();
    const nextSubStep = state.currentSubStep === max ? state.currentSubStep : state.currentSubStep + 1;
    setSubStep(nextSubStep);
}

export function setSubStep(nextSubStep: number) {
    resetScroll();
    setNextState({
        isHistory: true,
        currentSubStep: nextSubStep,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });
}

export function setSubStepMounted(nextSubStepMounted: number) {
    timeoutId = setTimeout(() => setNextState({ currentSubStepMounted: nextSubStepMounted }), 0);
    // creates enough delay to register as CSS transition
}

export function setSubStepUnmounted() {
    clearTimeout(timeoutId);
}

export function maxSteps() {
    const stepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EContributeSteps : ECheckBalanceSteps;
    return Object.keys(stepEnum).length / 2
}

export function maxSubSteps() {
    const subStepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EWhereToSendFundsSubSteps : ECheckWalletSubSteps;
    return Object.keys(subStepEnum).length / 2
}

export function resetScroll() {
    window.scroll(0, 0)
}
