import * as React from "react";
import { IStep } from '../../models';
import { CheckBalanceStart, CheckWallet, ViewWalletHistory } from '../../components';

export const checkBalanceStepList: IStep[] = [
    {
        name: "Check Balance Start",
        component: <CheckBalanceStart/>
    },
    {
        name: "Check Wallet",
        component: <CheckWallet/>
    },
    {
        name: "View Wallet History",
        component: <ViewWalletHistory/>
    }
];
