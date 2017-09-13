import { config } from './config';

export class ClientConfig {
	etherMinimumConfirmations = config.etherMinimumConfirmations;
	bitcoinMinimumConfirmations = config.bitcoinMinimumConfirmations;

	tokenDiscountPercent = config.tokenDiscountPercent;
	tokenPriceInEther = config.tokenPriceInEther;
};

export const clientConfig = new ClientConfig();

