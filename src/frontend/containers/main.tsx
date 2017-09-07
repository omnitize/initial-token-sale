import * as React from 'react';
import { State, EUserFlow } from '../models';
import { NavigatorSteps, ButtonMain } from '../common';
import { checkBalanceStepList, contributeStepList } from '../data/component-data';
import { registerAppRoot, setState } from '../state';

export class Main extends React.Component<any, State> {

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
        console.log('Main.render');
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
}
