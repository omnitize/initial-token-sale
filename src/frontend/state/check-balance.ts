import { setState, state } from './index'
import { maxSteps, resetScroll } from './navigation';

export const checkBalanceStartCaptchaSuccess = (sessionToken: string) => {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        sessionToken: sessionToken
    });

    resetScroll();
};

export const reclaimWalletContinue = () => {
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
