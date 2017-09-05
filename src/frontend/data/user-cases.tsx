import { checkBalanceStepList, contributeStepList} from './user-cases/';
import { IUseCase } from '../models';

export const useCaseList: IUseCase[] = [
    {
        name: "Contribute",
        steps: contributeStepList
    },
    {
        name: "Check Balance",
        steps: checkBalanceStepList
    }
];
