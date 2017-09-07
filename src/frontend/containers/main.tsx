import * as React from 'react';
import { EUserFlow } from '../models';
import { NavigatorSteps, ButtonMain } from '../common';
import { checkBalanceStepList, contributeStepList } from '../data/component-data';

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
            <div className="its-main">
                <div>
                    <ButtonMain
                        onClick={this.toggleUseCase}>
                        Toggle Use Case
                    </ButtonMain>
                </div>
                <NavigatorSteps
                    steps={this.steps()}
                />
            </div>
        );
    }
}
