

export function createWallet(mnemonicPhrase?: string): { mnemonicPhrase: string, wallet: string, address: string } {

	// get bip39 seed
	// create HD wallet
	return {
		mnemonicPhrase: '',
		address: '',
		wallet: ''
	};
}

export function checkMnemonic(mnemonicPhrase: string): boolean {
	return true;
}
