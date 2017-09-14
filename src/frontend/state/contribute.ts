import { setState, state } from './index'
import { maxSteps, resetScroll } from './navigation';
import { FundAddress } from '../models';

export function contributeStartCaptchaSuccess({ sessionToken, clientConfig }: { sessionToken: string, clientConfig: string }) {
    if(state.sessionToken) return;
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;
    setState( {
        currentStep: nextStep,
        sessionToken,
        clientConfig
    });
    resetScroll();
}

export function alreadyHaveWalletContinue(fundAddresses: Array<FundAddress>) {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
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
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        currentSubStep: -1,
        fundAddresses: fundAddresses,
        validationTextError: "", // reset validation
        validationCheckboxError: "" // reset validation
    });

    resetScroll();
}
