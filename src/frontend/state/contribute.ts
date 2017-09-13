import { setState, state } from './index'
import { maxSteps, resetScroll } from './navigation';
import { FundAddress } from '../models';

export const contributeStartCaptchaSuccess = ({ sessionToken: string, clientConfig: any }) => {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        sessionToken,
        clientConfig
    });

    resetScroll();
};

export const alreadyHaveWalletContinue = (fundAddresses: Array<FundAddress>) => {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        currentSubStep: -1,
        fundAddresses: fundAddresses
    });

    resetScroll();
};

export const createWalletContinue = (fundAddresses: Array<FundAddress>) => {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        currentSubStep: -1,
        fundAddresses: fundAddresses
    });

    resetScroll();
};
