import * as React from "react";
import { checkBalanceStepList, contributeStepList} from './user-cases/';
import { IUseCase } from '../models';

export const useCaseList: IUseCase[] = [
    {
        name: "Contribute",
        component: <div/>,
        steps: checkBalanceStepList
    },
    {
        name: "Check Balance",
        component: <div/>,
        steps: contributeStepList
    }
];
