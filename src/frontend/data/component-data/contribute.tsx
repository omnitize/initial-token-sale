import * as React from "react";
import { IStep } from '../../models';
import { ContributeStart, WhereToSendFunds, AlreadyHaveWallet, CreateWallet, SendFunds
} from '../../components';

export const contributeStepList: IStep[] = [
    {
        name: "Getting Started",
        component: <ContributeStart/>
    },
    {
        name: "Where To Send Funds",
        component: <WhereToSendFunds/>,
        subComponents: [
            <AlreadyHaveWallet/>,
            <CreateWallet/>
        ]
    },
    {
        name: "Send Funds",
        component: <SendFunds/>
    }
];
