import * as React from "react";
import { IStep } from '../../models';
import { ProveYouAreHuman, CheckWalletBalance, ViewWalletHistory } from '../../components';

export const checkBalanceStepList: IStep[] = [
    {
        name: "Prove You Are Human",
        component: <ProveYouAreHuman/>
    },
    {
        name: "Check Wallet Balance",
        component: <CheckWalletBalance/>
    },
    {
        name: "View Wallet History",
        component: <ViewWalletHistory/>
    }
];
