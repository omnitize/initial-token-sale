import * as React from 'react';
import { State, EUserFlow } from '../models';
import { NavigatorSteps, ButtonMain } from '../common';
import { checkBalanceStepList, contributeStepList } from '../data/component-data';
import { registerAppRoot, setState } from '../state';
import { goBack } from '../state/navigation';

export class Main extends React.Component<any, State> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        window.history.pushState(new State, `initial-state`, `/`);
        window.addEventListener("popstate", goBack);
    }

    componentWillMount() {
        registerAppRoot(this);
        setState({});
    }

    render(): JSX.Element {
        return (
            <div className="its-main">
                <ButtonMain
                    onClick={this.toggleUseCase}>
                    Toggle Use Case
                </ButtonMain>
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
            currentSubStepMounted: -1,
            validationCheckboxError: "",
            validationTextError: "",
            targetAddress: "",
            targetMnemonicPhrase: "",
            targetWallet: ""
        });
    }

    private steps = () => {
        return this.state.selectedUseCase === EUserFlow.CONTRIBUTE
            ? contributeStepList
            : checkBalanceStepList
    };
}
