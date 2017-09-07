import * as React from 'react';
import { whereToSendFundsContent as content } from '../../../data/text-data'
import { ButtonMain } from '../../../common/button-main';
import {State, EContributeSteps, EWhereToSendFundsSubSteps} from '../../../models';
import { contributeStepList } from '../../../data/component-data';
import {setSubStep} from '../../../state';

interface IProps {
    state?: State
}

export class WhereToSendFunds extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { currentSubStep } = this.props.state;
        return (
            <div>
                <h2>{content.heading}</h2>
                <h4>{content.heading2}</h4>
                <p>{content.paragraph}</p>
                <ButtonMain
                    onClick={this.handleAlreadyHaveWallet}
                >
                    {content.button}
                </ButtonMain>
                <ButtonMain
                    onClick={this.handleCreateWallet}
                >
                    {content.button2}
                </ButtonMain>
                <div>
                    {currentSubStep > -1
                        ?  contributeStepList[EContributeSteps.WHERE_TO_SEND_FUNDS].subComponents[currentSubStep]
                        :  null}
                </div>
            </div>
        );
    }

    private handleAlreadyHaveWallet = () => {
        setSubStep(EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET);
    };
    private handleCreateWallet = () => {
        setSubStep(EWhereToSendFundsSubSteps.CREATE_WALLET);
    };

}
