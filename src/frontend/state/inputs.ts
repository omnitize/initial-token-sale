import { setState } from './index'

// t e x t
export const typeWalletAddress = (nextWalletAddress: string) => {
    setState({
        walletAddress: nextWalletAddress
    });
};

export const typePnemonicPhrase = (nextPnemonicPhrase: string) => {
    setState({
        targetMnemonicPhrase: nextPnemonicPhrase
    });
};

// c h e c k b o x
export const checkDoubleCheckedAddress = (nextIsDoubleCheckedAddress: boolean) => {
    setState({
        isDoubleCheckedAddress: nextIsDoubleCheckedAddress
    });
};

export const checkWrittenMnemonicPhrase = (nextIsWrittenMnemonicPhrase: boolean) => {
    setState({
        isWrittenMnemonicPhrase: nextIsWrittenMnemonicPhrase
    });
};

