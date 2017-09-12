import { setState, state } from './index'
import { maxSteps, resetScroll } from './navigation';

// t e x t
export const handleCaptchaSuccess = (sessionToken: string) => {
    const max: number = maxSteps();
    const nextStep: number = state.currentStep === max ? state.currentStep : state.currentStep + 1;

    setState( {
        currentStep: nextStep,
        sessionToken: sessionToken
    });

    resetScroll();
};
