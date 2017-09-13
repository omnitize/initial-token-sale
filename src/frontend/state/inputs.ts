import { setState } from './index'

// t e x t
export const typeWalletAddress = (nextAddress: string) => {
    setState({
        targetAddress: nextAddress,
        validationTextError: ""
    });
};

export const typeMnemonicPhrase = (nextPnemonicPhrase: string) => {
    setState({
        targetMnemonicPhrase: nextPnemonicPhrase,
        validationTextError: ""
    });
};

export const changeTextValidationError = (nextValidationTextError: string) => {
    setState({
        validationTextError: nextValidationTextError
    });
};

// c h e c k b o x
export const checkDoubleCheckedAddress = (nextIsDoubleCheckedAddress: boolean) => {
    setState({
        isDoubleCheckedAddress: nextIsDoubleCheckedAddress,
        validationCheckboxError: ""
    });
};

export const checkWrittenMnemonicPhrase = (nextIsWrittenMnemonicPhrase: boolean) => {
    setState({
        isWrittenMnemonicPhrase: nextIsWrittenMnemonicPhrase,
        validationCheckboxError: ""
    });
};

export const changeCheckValidationError = (nextValidationCheckboxError: string) => {
    setState({
        validationCheckboxError: nextValidationCheckboxError
    });
};
