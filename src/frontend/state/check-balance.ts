import { setState, state } from './index'
import { maxSteps, resetScroll } from './navigation';

export function checkBalanceStartCaptchaSuccess({ sessionToken, clientConfig }: { sessionToken: string, clientConfig: any }) {
    if(state.sessionToken) return;
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setState( {
        currentStep: nextStep,
        sessionToken,
        clientConfig
    });
    resetScroll();
};

export function reclaimWalletContinue() {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        currentSubStep: -1,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });

    resetScroll();
};
