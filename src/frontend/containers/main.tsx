import * as React from 'react';
import { EUserFlow } from '../state';
import { StepNavigator } from '../common/step-navigator';
import {checkBalanceStepList} from '../data/user-cases/check-balance';
import {contributeStepList} from '../data/user-cases/contribute';


interface IMainProps {}

interface IMainState {
    selectedUseCase: EUserFlow
}

export class Main extends React.Component<IMainProps, IMainState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            selectedUseCase: EUserFlow.CONTRIBUTE
        };
    }

    private toggleUseCase = () => {
        this.setState({
            selectedUseCase: this.state.selectedUseCase === EUserFlow.CONTRIBUTE
                ? EUserFlow.CHECK_BALANCE
                : EUserFlow.CONTRIBUTE
        })
    };

    private steps = () => {
        return this.state.selectedUseCase === EUserFlow.CONTRIBUTE
            ? contributeStepList
            : checkBalanceStepList
    };

    render(): JSX.Element {
        return (
            <div>
                <button onClick={this.toggleUseCase}>
                    Toggle Use Case
                </button>
                <StepNavigator
                    steps={this.steps()}
                />
            </div>
        );
    }
}
