import * as Promise from 'bluebird';
import * as express from 'express';
const fetch = require('node-fetch');
const FormData = require('form-data');
const crypto = require('crypto');
const base64url = require('base64url');
const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql-dev.chlrlmqjpsxl.us-east-1.rds.amazonaws.com',
  user            : 'admin',
  password        : 'admin123',
  database        : 'omnitize_dev'
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
}

export function setupApi(app: express.Application) {
	app.use('/api/createSession', (req: express.Request, res: express.Response) => {
		createSession((req.query as Params).captcha, req.connection.remoteAddress)
		.then(obj => {
			res.json(obj);
		});
	});
}

export function createSession(captcha: string, remoteIp: string): Promise<{ sessionToken: string }> {

	var data = new FormData()
	data.append('secret', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe');
	data.append('response', captcha);
	data.append('remoteIp', remoteIp);

	return fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		body: data
	})
	.then((response: any) => response.json())
	.then((result: any) => {
		console.log(result);
		if(!result.success) throw result;
		const sessionToken = base64url(crypto.randomBytes(32));
		return query('insert into sessions (session_id) values (?)', [ sessionToken ])
		.then(() => { return { sessionToken }; });
	});
}
