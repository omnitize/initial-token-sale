

export function createWallet(mnemonicPhrase?: string): { mnemonicPhrase: string, wallet: string, address: string } {
	console.log('createWallet', mnemonicPhrase);

	// get bip39 seed
	// create HD wallet
	return {
		mnemonicPhrase: '',
		address: '',
		wallet: ''
	};
}

export function checkMnemonic(mnemonicPhrase: string): boolean {
	console.log('checkMnemonic', mnemonicPhrase);
	return true;
}
