import * as Promise from 'bluebird';
import * as express from 'express';
import { config } from './config';
import { clientConfig } from './client-config';
import { query } from './database';
import { FundAddress } from '../frontend/models';
const fetch = require('node-fetch');
const FormData = require('form-data');
const crypto = require('crypto');
const base64url = require('base64url');

interface Params {
	captcha?: string;
	sessionToken?: string;
	targetAddress?: string;
}

export function setupApi(app: express.Application) {
	app.use('/api/createSession', (req: express.Request, res: express.Response) => {
		return createSession((req.query as Params).captcha, req.connection.remoteAddress)
		.then(obj => res.json(obj))
		.catch(er => {
			console.log(er);
			res.status(500).send(er);
		});
	});
	app.use('/api/sendTargetAddress', (req: express.Request, res: express.Response) => {
		return sendTargetAddress((req.query as Params).sessionToken, (req.query as Params).targetAddress)
		.then(obj => res.json(obj))
		.catch(er => {
			console.log(er);
			res.status(500).send(er);
		});
	});
	app.use('/api/loadTransactions', (req: express.Request, res: express.Response) => {
		console.log('ASDASDASD');
		return loadTransactions((req.query as Params).targetAddress)
		.then(obj => res.json(obj))
		.catch(er => {
			console.log(er);
			res.status(500).send(er);
		});
	});
}

export function createSession(captcha: string, remoteIp: string): Promise<{ sessionToken: string, clientConfig: any }> {
	var data = new FormData()
	data.append('secret', config.recaptchaSiteSecret);
	data.append('response', captcha);
	data.append('remoteIp', remoteIp);
	return fetch(config.recaptchaUrl, {
		method: 'POST',
		body: data
	})
	.then((response: any) => response.json())
	.then((response: any) => {
		if(!response.success) throw new Error('Captcha failed: ' + JSON.stringify(response));
		const sessionToken = base64url(crypto.randomBytes(config.sessionTokenSize));
		return query('insert into sessions (session_id) values (?)', [ sessionToken ])
		.then(() => { return { sessionToken, clientConfig }; });
	});
}

export function sendTargetAddress(sessionToken: string, targetAddress: string): Promise<{ fundAddresses: Array<FundAddress> }> {
	return Promise.resolve()
	.then(() => query('update sessions set target_address=? where session_id=? and ( target_address=? or target_address is NULL )', [ targetAddress, sessionToken, targetAddress ]))
	.then(results => { if (results.affectedRows != 1) throw new Error('Invariant violation'); })
	.then(() => query('insert into addresses_inc (session_id) values (?)', [ sessionToken ]))
	.then(results => query('update addresses set session_id=? where id=?', [ sessionToken, results.insertId]))
	.then(() => query('select * from addresses where session_id=?', [ sessionToken ]))
	.then(results => {
		if(results.length != 1) throw new Error('Invariant violation');
		return query('select * from rates order by created desc limit 1', [])
		.then(rates => {
			if(rates.length != 1) throw new Error('Invariant violation');
			return { 
				fundAddresses: [
					{
						currency: 'ether',
						address: results[0].ether,
						price: 1.0
					},
					{
						currency: 'bitcoin',
						address: results[0].bitcoin,
						price: rates[0].bitcoin
					}				
				]
			}; 
		});
	});
}

const fakeDate = new Date();

export function loadTransactions(targetAddress: string): Promise<{ transactions: Array<any> }> {
	console.log(targetAddress);
	return Promise.resolve().then(
	//.then(() => query('select * from transactions where target_address=?', [ targetAddress ]))
	() => {
		return [
			{
				created: fakeDate,
				value: 3.14,
				currency: 'bitcoin',
				discount_perc: 20,
				price: 0.001,
				confirmations: 0,
				tokens_earned: 0,
				tokens_paid: 0,
				status: 'PENDING'
			},
			{
				created: fakeDate,
				value: 2.17,
				currency: 'bitcoin',
				discount_perc: 10,
				price: 0.087,
				confirmations: 1,
				tokens_earned: 17.3,
				tokens_paid: 0,
				status: 'CONFIRMED'
			},
			{
				created: fakeDate,
				value: 0.98,
				currency: 'ether',
				discount_perc: 50,
				price: 0.00032,
				confirmations: 12,
				tokens_earned: 4.3,
				tokens_paid: 4.3,
				status: 'PAID'
			}
		];
	})
	.then(results => {
		console.log('@#$!@#$@#$!234', results);
		return results.map(r => ({
		    created: r.created,
	    	value: r.value,
	    	currency: r.currency,
	    	discountPerc: r.discount_perc,
	    	price: r.price,
	    	confirmations: r.confirmations,
	    	tokensEarned: r.tokens_earned,
	    	tokensPaid: r.tokens_paid,
	    	status: r.status
		}));
	})
	.then(transactions => {
		console.log(transactions);
		return { transactions: transactions };
	});
}
