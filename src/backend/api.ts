import * as Promise from 'bluebird';
import * as express from 'express';

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
		createSession((req.query as Params).captcha)
		.then(obj => {
			res.json(obj);
		});
	});
}

export function createSession(captcha: string): Promise<{ sessionToken: string }> {

	// check captcha
	console.log(captcha);

	const sessionToken = base64url(crypto.randomBytes(32));
	return query('insert into sessions (session_id) values (?)', [ sessionToken ])
	.then(() => sessionToken);
}
