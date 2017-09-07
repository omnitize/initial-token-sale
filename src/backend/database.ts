import * as Promise from 'bluebird';
import { config } from './config';
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlServer,
  user: config.mysqlUsername,
  password: config.mysqlPassword,
  database: config.mysqlSchema
});

export function query(sql: string, params: any): Promise<any> {
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
