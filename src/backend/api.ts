import * as Promise from 'bluebird';
import * as express from 'express';
import { config } from './config';
const fetch = require('node-fetch');
const FormData = require('form-data');
const crypto = require('crypto');
const base64url = require('base64url');
const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlServer,
  user: config.mysqlUsername,
  password: config.mysqlPassword,
  database: config.mysqlSchema
});

function query(sql: string, params: any): Promise<any> {
	return new Promise((resolve, reject) => {
		pool.query(sql, params, (error: any, results: Array<any>/*, fields: any */) => {
			if(error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

interface Params {
	captcha?: string;
	sessionToken?: string;
	targetAddress?: string;
}

export function setupApi(app: express.Application) {
	app.use('/api/createSession', (req: express.Request, res: express.Response) => {
		createSession((req.query as Params).captcha, req.connection.remoteAddress)
		.then(obj => res.json(obj))
		.catch(er => {
			console.log(er);
			res.status(500).send(er);
		});
	});
	app.use('/api/sendTargetAddress', (req: express.Request, res: express.Response) => {
		sendTargetAddress((req.query as Params).sessionToken, (req.query as Params).targetAddress)
		.then(obj => res.json(obj))
		.catch(er => {
			console.log(er);
			res.status(500).send(er);
		});
	});
}

export function createSession(captcha: string, remoteIp: string): Promise<{ sessionToken: string }> {
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
		.then(() => { return { sessionToken }; });
	});
}

export function sendTargetAddress(sessionToken: string, targetAddress: string): Promise<{ fundAddresses: { [key: string]: string } }> {
	return Promise.resolve()
	.then(() => query('update sessions set target_address=? where session_id=? and ( target_address=? or target_address is NULL )', [ targetAddress, sessionToken, targetAddress ]))
	.then(results => { if (results.affectedRows != 1) throw new Error('Invariant violation'); })
	.then(() => query('insert into addresses_inc (session_id) values (?)', [ sessionToken ]))
	.then(results => query('update addresses set session_id=? where id=?', [ sessionToken, results.insertId]))
	.then(() => query('select * from addresses where session_id=?', [ sessionToken ]))
	.then(results => { 
		if(results.length != 1) throw new Error('Invariant violation');
		return { fundAddresses: { 'bitcoin': results[0].bitcoin, 'ether': results[0].ether } }; 
	});
}



