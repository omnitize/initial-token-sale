const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
import { setState } from './index'

export const createWallet = (mnemonicPhrase?: string) => {
    if(!mnemonicPhrase) {
        mnemonicPhrase = bip39.generateMnemonic();
    }
    const wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonicPhrase)).getWallet();
    const v3String = wallet.toV3String('password');
    const address = wallet.getAddressString();
    setState({
        targetAddress: address,
        targetMnemonicPhrase: mnemonicPhrase,
        targetWallet: v3String
    });
};

export const checkMnemonic = (mnemonicPhrase: string): boolean => {
    return bip39.validateMnemonic(mnemonicPhrase);
};
