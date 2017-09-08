
import * as Promise from 'bluebird';
import { config } from './config';
import { query } from './database';
const fetch = require('node-fetch');

export function getRates(): Promise<any> {
	return fetch('https://poloniex.com/public?command=returnTicker')
	.then((response: any) => response.json())
	.then((response: any) => {
		return {
			bitcoin: response.BTC_ETH.last
		};
	});
}

export function writeRatesToDatabase(rates: any): Promise<void> {
	return query('insert into rates (bitcoin) values (?)', [ rates.bitcoin ]);
}

export function ratesRunner() {

	setInterval(() => {
		getRates()
		.then((rates: any) => writeRatesToDatabase(rates));

	}, 60 * 1000);
}
