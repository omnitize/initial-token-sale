import { setNextState, state } from './index'
import { maxSteps, resetScroll } from './navigation';
import { ICaptchaSuccessParams } from '../models';

export function checkBalanceStartCaptchaSuccess(captchaSuccessParams: ICaptchaSuccessParams) {
    if(state.sessionToken) return;
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === (max - 1) ? state.currentStep : state.currentStep + 1;
    setNextState( {
        isHistory: true,
        currentStep: nextStep,
        sessionToken: captchaSuccessParams.sessionToken,
        clientConfig: captchaSuccessParams.clientConfig
    });
    resetScroll();
}


export function reclaimWalletContinue() {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === (max - 1) ? state.currentStep : state.currentStep + 1;

    setNextState( {
        isHistory: true,
        currentStep: nextStep,
        currentSubStep: -1,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });

    resetScroll();
}
