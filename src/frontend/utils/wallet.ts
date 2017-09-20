const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
import { IWalletInfo } from '../models';

export function createWallet(mnemonicPhrase?: string): Promise<IWalletInfo | string> {
    return new Promise((resolve, reject) => {
        if(!mnemonicPhrase) {
            mnemonicPhrase = bip39.generateMnemonic();
        }
        const wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonicPhrase)).getWallet();
        const v3String: string = wallet.toV3String('password');
        const address: string = wallet.getAddressString();
        if (mnemonicPhrase && v3String && address) {
            resolve({
                targetAddress: address,
                targetMnemonicPhrase: mnemonicPhrase,
                targetWallet: v3String
            });
        } else {
            reject("Wallet creation failed.");
        }
    });
}

export function checkMnemonic(mnemonicPhrase: string): boolean {
    return bip39.validateMnemonic(mnemonicPhrase);
}
