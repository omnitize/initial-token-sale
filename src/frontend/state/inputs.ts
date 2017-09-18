import { setNextState } from './index'

// t e x t
export const typeWalletAddress = (nextAddress: string) => {
    setNextState({
        targetAddress: nextAddress,
        validationTextError: ""
    });
};

export const typeMnemonicPhrase = (nextPnemonicPhrase: string) => {
    setNextState({
        targetMnemonicPhrase: nextPnemonicPhrase,
        validationTextError: ""
    });
};

export const changeTextValidationError = (nextValidationTextError: string) => {
    setNextState({
        validationTextError: nextValidationTextError
    });
};

// c h e c k b o x
export const checkDoubleCheckedAddress = (nextIsDoubleCheckedAddress: boolean) => {
    setNextState({
        isDoubleCheckedAddress: nextIsDoubleCheckedAddress,
        validationCheckboxError: ""
    });
};

export const checkWrittenMnemonicPhrase = (nextIsWrittenMnemonicPhrase: boolean) => {
    setNextState({
        isWrittenMnemonicPhrase: nextIsWrittenMnemonicPhrase,
        validationCheckboxError: ""
    });
};

export const changeCheckValidationError = (nextValidationCheckboxError: string) => {
    setNextState({
        validationCheckboxError: nextValidationCheckboxError
    });
};
