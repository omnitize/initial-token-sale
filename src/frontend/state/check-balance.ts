import { setState, state } from './index'
import { maxSteps, resetScroll } from './navigation';
import { ICaptchaSuccessParams } from '../models';

export const checkBalanceStartCaptchaSuccess = (captchaSuccessParams: ICaptchaSuccessParams) => {
    if(state.sessionToken) return;
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setState( {
        currentStep: nextStep,
        sessionToken: captchaSuccessParams.sessionToken,
        clientConfig: captchaSuccessParams.clientConfig
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
