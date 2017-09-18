import { setNextState } from './index'

// t e x t
export function typeWalletAddress(nextAddress: string) {
    setNextState({
        targetAddress: nextAddress,
        validationTextError: ""
    });
}

export function typeMnemonicPhrase(nextPnemonicPhrase: string) {
    setNextState({
        targetMnemonicPhrase: nextPnemonicPhrase,
        validationTextError: ""
    });
}

export function changeTextValidationError(nextValidationTextError: string) {
    setNextState({
        validationTextError: nextValidationTextError
    });
}

export function changeTextValidationError2(nextValidationTextError: string) {
    setNextState({
        validationTextError2: nextValidationTextError
    });
}

// c h e c k b o x
export function checkDoubleCheckedAddress(nextIsDoubleCheckedAddress: boolean) {
    setNextState({
        isDoubleCheckedAddress: nextIsDoubleCheckedAddress,
        validationCheckboxError: ""
    });
}

export function checkWrittenMnemonicPhrase(nextIsWrittenMnemonicPhrase: boolean) {
    setNextState({
        isWrittenMnemonicPhrase: nextIsWrittenMnemonicPhrase,
        validationCheckboxError: ""
    });
}

export function changeCheckValidationError(nextValidationCheckboxError: string) {
    setNextState({
        validationCheckboxError: nextValidationCheckboxError
    });
}
