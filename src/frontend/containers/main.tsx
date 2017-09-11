import * as React from 'react';
import { State, EUserFlow } from '../models';
import { NavigatorSteps, ButtonMain } from '../common';
import { checkBalanceStepList, contributeStepList } from '../data/component-data';
import { registerAppRoot, setState } from '../state/index';

export class Main extends React.Component<any, State> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentWillMount() {
        registerAppRoot(this);
        setState({});
    }

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
                    state={ this.state }
                    steps={ this.steps() }
                />
            </div>
        );
    }

    private toggleUseCase = () => {
        setState({
            selectedUseCase: this.state.selectedUseCase === EUserFlow.CONTRIBUTE
                ? EUserFlow.CHECK_BALANCE
                : EUserFlow.CONTRIBUTE
        });
        Main.reset();
    };

    static reset() {
        setState({
            currentStep: 0,
            currentSubStep: -1,
            currentSubStepMounted: -1
        });
    }

    private steps = () => {
        return this.state.selectedUseCase === EUserFlow.CONTRIBUTE
            ? contributeStepList
            : checkBalanceStepList
    };
}
