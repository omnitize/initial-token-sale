import * as React from 'react';
import { ButtonMain } from '../..';
import { setNextState } from '../../../state';
import { EUserFlow, State } from '../../../models';

interface IUseCaseToggleProps {
    state: State
}

export class UseCaseToggle extends React.Component<IUseCaseToggleProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <ButtonMain
                    onClick={this.toggleUseCase}>
                    Toggle Use Case
                </ButtonMain>
            </div>
        );
    }

    private toggleUseCase = () => {
        setNextState({
            selectedUseCase: this.state.selectedUseCase === EUserFlow.CONTRIBUTE
                ? EUserFlow.CHECK_BALANCE
                : EUserFlow.CONTRIBUTE
        });
        UseCaseToggle.reset();
    };

    static reset() {
        setNextState({
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
}
