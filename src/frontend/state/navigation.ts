import { setNextState, setStateFromHistory, state } from './index'

let timeoutId: any;

import {
    EContributeSteps, ECheckBalanceSteps, EUserFlow, EWhereToSendFundsSubSteps,
    ECheckWalletSubSteps
} from '../models';

// n a v i g a t e  h i s t o r y

export const goBackInPage = () => {
    if (window && window.history.state)  {
        window.history.back();
    }
};

export const goForwardInPage = () => {
    if (window && window.history.state)  {
        window.history.forward();
    }
};

export const navigateHistory = (e: PopStateEvent) => {
    const isBackHistory = {
        isBackHistory: e.state.currentStep < state.currentStep || e.state.currentSubStep <= state.currentSubStep
    };
    setStateFromHistory(Object.assign(e.state, isBackHistory));
};

// s t e p s

export const incrementStep = () => {
    const max = maxSteps();
    const nextStep = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setStep(nextStep);
};

export const setStep = (nextStep: number) => {
    resetScroll();
    setNextState({
        isHistory: true,
        currentStep: nextStep
    });
};

// s u b - s t e p s

export const incrementSubStep = () => {
    const max = maxSubSteps();
    const nextSubStep = state.currentSubStep === max ? state.currentSubStep : state.currentSubStep + 1;
    setSubStep(nextSubStep);
};

export const setSubStep = (nextSubStep: number) => {
    resetScroll();
    setNextState({
        isHistory: true,
        currentSubStep: nextSubStep
    });
};

export const setSubStepMounted = (nextSubStepMounted: number) => {
    timeoutId = setTimeout(() => setNextState({ currentSubStepMounted: nextSubStepMounted }), 0);
    // creates enough delay to register as CSS transition
};

export const setSubStepUnmounted = () => {
    clearTimeout(timeoutId);
};

export const maxSteps = () => {
    const stepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EContributeSteps : ECheckBalanceSteps;
    return Object.keys(stepEnum).length / 2
};

export const maxSubSteps = () => {
    const subStepEnum = state.selectedUseCase === EUserFlow.CONTRIBUTE ? EWhereToSendFundsSubSteps : ECheckWalletSubSteps;
    return Object.keys(subStepEnum).length / 2
};

export const resetScroll = () => window.scroll(0, 0);
