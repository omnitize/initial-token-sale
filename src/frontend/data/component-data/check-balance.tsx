import * as React from "react";
import { IStep } from '../../models';
import { CheckBalanceStart, CheckWallet, ViewWalletHistory } from '../../components';
import { ReclaimWallet } from '../../components/check-balance/step-2/sub-steps/reclaim-wallet';

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
