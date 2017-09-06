import * as Promise from 'bluebird';
import { TxStatus } from './state';
export function createSession(captcha) {
    console.log('createSession', captcha);
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({ sessionToken: '1234' });
        }, 300);
    });
}
export function sendTargetAddress(sessionToken, targetAddress) {
    console.log('sendTargetAddress', sessionToken, targetAddress);
    var fundAddresses = {
        'bitcoin': '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
        'ether': '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    };
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({ fundAddresses: fundAddresses });
        }, 300);
    });
}
export function loadTransactions(sessionToken, targetAddress) {
    console.log('loadTransactions', sessionToken, targetAddress);
    var transactions = [
        {
            datetime: new Date(),
            value: 13.3,
            currency: 'BitCoin',
            price: 0.003,
            tokens: 0,
            status: TxStatus.PENDING
        },
        {
            datetime: new Date(),
            value: 18.01,
            currency: 'Ether',
            price: 0.01,
            tokens: 16.008,
            status: TxStatus.FINAL
        },
    ];
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({ transactions: transactions });
        }, 300);
    });
}
//# sourceMappingURL=server-api.js.map