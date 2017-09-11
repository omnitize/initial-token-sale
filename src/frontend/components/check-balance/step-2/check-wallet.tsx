import * as React from 'react';
import { checkWalletContent as content } from '../../../data/text-data';
import { ButtonMain, ButtonText } from '../../../common';
import { InputText } from '../../../common/input-text';
import { ChangeEvent } from 'react';
import { checkBalanceStepList } from '../../../data/component-data/check-balance';
import { ECheckBalanceSteps, State } from '../../../models';
import { incrementSubStep } from '../../../state/index';

interface ICheckWalletProps {
    state?: State
}

export class CheckWallet extends React.Component<ICheckWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            this.props.state.currentSubStep === -1
                ?  <div>
                        <h2>
                            {content.heading}
                        </h2>
                        <p>
                            {content.paragraph}
                        </p>
                        <div>
                            <InputText
                                value=""
                                name={content.input.name}
                                label={content.input.label}
                                onChange={this.handleChange}
                            />
                            <div className="its-check-wallet__text-button">
                                <ButtonText
                                    onClick={this.handleNoWalletAddress}
                                >
                                    {content.button}
                                </ButtonText>
                            </div>
                        </div>
                        <div>
                            <ButtonMain
                                onClick={this.handleContinue}
                            >
                                {content.button2}
                            </ButtonMain>
                        </div>
                    </div>
                :   this.renderSubStep()
        );
    }

    static subSteps(): JSX.Element[] {
        return checkBalanceStepList[ECheckBalanceSteps.CHECK_WALLET].subComponents;
    }

    private renderSubStep() {
        return React.cloneElement(
            CheckWallet.subSteps()[this.props.state.currentSubStep],
            {
                state: this.props.state
            }
        )
    }

    private handleNoWalletAddress = () => {};

    private handleContinue = () => {
        incrementSubStep();
    };

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {console.log(e)};

}
