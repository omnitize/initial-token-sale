import * as React from 'react';
import { State, EUserFlow } from '../models';
import { NavigatorSteps, ButtonMain } from '../common';
import { checkBalanceStepList, contributeStepList } from '../data/component-data';
import { registerAppRoot, setState } from '../state';

interface IMainProps {}

export class Main extends React.Component<IMainProps, State> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentWillMount() {
        registerAppRoot(this);
        setState({});
    }

    private toggleUseCase = () => {
        setState({
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
        console.log('Main.redner');
        return (
            <div className="its-main">
                <div>
                    <ButtonMain
                        onClick={this.toggleUseCase}>
                        Toggle Use Case
                    </ButtonMain>
                </div>
                <NavigatorSteps
                    currentStep={ this.state.currentStep }
                    steps={ this.steps() }
                />
            </div>
        );
    }
}
