import { setNextState, state } from './index'
import { maxSteps, resetScroll } from './navigation';
import { FundAddress, ICaptchaSuccessParams } from '../models';

export function contributeStartCaptchaSuccess(captchaSuccessParams: ICaptchaSuccessParams) {
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

export function alreadyHaveWalletContinue(fundAddresses: Array<FundAddress>) {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === (max - 1) ? state.currentStep : state.currentStep + 1;

    setNextState( {
        isHistory: true,
        isLoading: false,
        currentStep: nextStep,
        currentSubStep: -1,
        fundAddresses: fundAddresses,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });

    resetScroll();
}

export function createWalletContinue(fundAddresses: Array<FundAddress>) {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === (max - 1) ? state.currentStep : state.currentStep + 1;

    setNextState( {
        isHistory: true,
        isLoading: false,
        currentStep: nextStep,
        currentSubStep: -1,
        fundAddresses: fundAddresses,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });

    resetScroll();
}
