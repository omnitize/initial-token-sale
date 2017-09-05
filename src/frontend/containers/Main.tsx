import * as React from 'react';
import { useCaseList } from '../data/user-cases';
import {EUserFlow} from '../state';
import {StepNavigator} from '../common/StepNavigator';

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

    render(): JSX.Element {
        return (
            <div>
                <button onClick={this.toggleUseCase}>
                    Toggle Use Case
                </button>
                <div>{useCaseList[this.state.selectedUseCase].name}</div>
                <StepNavigator
                    steps={useCaseList[this.state.selectedUseCase].steps}
                />
            </div>
        );
    }
}
