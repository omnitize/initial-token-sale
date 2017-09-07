import * as React from "react";
import { IStep } from '../../models';
import { CheckBalanceStart, CheckWallet, ReclaimWallet, ViewWalletHistory } from '../../components';

export const checkBalanceStepList: IStep[] = [
    {
        name: "Check Balance Start",
        component: <CheckBalanceStart/>
    },
    {
        name: "Check Wallet",
        component: <CheckWallet/>,
        subComponents: [<ReclaimWallet/>]
    },
    {
        name: "View Wallet History",
        component: <ViewWalletHistory/>
    }
];
