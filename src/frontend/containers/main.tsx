import * as React from 'react';
import { State, EUserFlow } from '../models';
import { NavigatorSteps } from '../common';
import { checkBalanceStepList, contributeStepList } from '../data/component-data';
import { registerAppRoot, setNextState } from '../state';
import { navigateHistory } from '../state/navigation';
import {DevOptions} from '../common/dev-options/index';

export class Main extends React.Component<any, State> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        window.history.pushState(new State, `initial-state`, `/`);
        window.addEventListener("popstate", navigateHistory);
    }

    componentWillUnmount() {
        window.removeEventListener("popstate", navigateHistory);
    }

    componentWillMount() {
        registerAppRoot(this);
        setNextState({});
    }

    render(): JSX.Element {
        return (
            <div className={`its-main ${this.state.isDarkTheme ? "--dark" : ""}`}>
                <DevOptions
                    state={ this.state }
                />
                <NavigatorSteps
                    state={ this.state }
                    steps={ this.steps() }
                />
            </div>
        );
    }

    private steps = () => {
        return this.state.selectedUseCase === EUserFlow.CONTRIBUTE
            ? contributeStepList
            : checkBalanceStepList
    };
}
