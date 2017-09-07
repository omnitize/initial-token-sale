import { config } from '../config';
import { query } from '../database';
const crypto = require('crypto');
const base64url = require('base64url');

export function createFakeAddresses() {
	for(var i=0; i < 1000; i++) {
		const r1 = base64url(crypto.randomBytes(config.sessionTokenSize));
		const r2 = base64url(crypto.randomBytes(config.sessionTokenSize));
		console.log(r1, r2);
		query('insert into addresses (bitcoin, ether) values (?, ?)', [ r1, r2 ]);
	}
}

createFakeAddresses();
