import * as React from "react";
import { IStep } from '../../models';
import { GetStarted, WhereToSendFunds, SendFunds } from '../../components';

export const contributeStepList: IStep[] = [
    {
        name: "Get Started",
        component: <GetStarted/>
    },
    {
        name: "Where To Send Funds",
        component: <WhereToSendFunds/>
    },
    {
        name: "Send Funds",
        component: <SendFunds/>
    }
];
