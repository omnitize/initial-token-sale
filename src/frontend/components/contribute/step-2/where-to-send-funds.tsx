import * as React from 'react';
import { whereToSendFundsContent as content } from '../../../data/text-data'
import { ButtonMain } from '../../../common/button-main';
import { State, EContributeSteps, EWhereToSendFundsSubSteps } from '../../../models';
import { contributeStepList } from '../../../data/component-data';
import { setSubStep } from '../../../state/index';

interface IWhereToSendFundsProps {
    state?: State
}

export class WhereToSendFunds extends React.Component<IWhereToSendFundsProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const currentSubStep = this.props.state.currentSubStep;
        const isOptionSelected = currentSubStep > -1;

        return (
            <div>
                <div>
                    <h2>{content.heading}</h2>
                    <h4>{content.heading2}</h4>
                    <p>{content.paragraph}</p>
                    <ButtonMain
                        isSelected={currentSubStep === EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET}
                        isUnselected={isOptionSelected && currentSubStep !== EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET}
                        onClick={this.handleAlreadyHaveWallet}
                    >
                        {content.button}
                    </ButtonMain>
                    <ButtonMain
                        isSelected={currentSubStep === EWhereToSendFundsSubSteps.CREATE_WALLET}
                        isUnselected={isOptionSelected && currentSubStep !== EWhereToSendFundsSubSteps.CREATE_WALLET}
                        onClick={this.handleCreateWallet}
                    >
                        {content.button2}
                    </ButtonMain>
                </div>
                {isOptionSelected
                    ?   <div>
                            {this.renderSubStep()}
                        </div>
                    :   null}

            </div>
        );
    }

    static subSteps(): JSX.Element[] {
        return contributeStepList[EContributeSteps.WHERE_TO_SEND_FUNDS].subComponents;
    }

    private renderSubStep() {
        return React.cloneElement(
            WhereToSendFunds.subSteps()[this.props.state.currentSubStep],
            {
                state: this.props.state
            }
        )
    }

    private handleAlreadyHaveWallet = () => {
        setSubStep(EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET);
    };

    private handleCreateWallet = () => {
        setSubStep(EWhereToSendFundsSubSteps.CREATE_WALLET);
    };
}
