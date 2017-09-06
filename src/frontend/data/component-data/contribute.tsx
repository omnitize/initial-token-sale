import * as React from "react";
import { IStep } from '../../models';
import { ContributeStart, WhereToSendFunds, ReclaimWallet, SendFunds } from '../../components';

export const contributeStepList: IStep[] = [
    {
        name: "Contribute Start",
        component: <ContributeStart/>
    },
    {
        name: "Where To Send Funds",
        component: <WhereToSendFunds/>,
        subComponents: [
            <ReclaimWallet/>
        ]
    },
    {
        name: "Send Funds",
        component: <SendFunds/>
    }
];
