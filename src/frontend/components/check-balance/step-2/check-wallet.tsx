import * as React from 'react';
import { checkWalletContent as content } from '../../../data/text-data';
import { ButtonMain, ButtonText } from '../../../common';
import { Input } from '../../../common/input';
import { ChangeEvent } from 'react';
import { checkBalanceStepList } from '../../../data/component-data/check-balance';
import { ECheckBalanceSteps } from '../../../models';

interface ICheckWalletProps {}

interface ICheckWalletState {
    subStepIndex: number
}

export class CheckWallet extends React.Component<ICheckWalletProps, ICheckWalletState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            subStepIndex: -1
        };
    }

    handleNoWalletAddress = () => {};
    handleContinue = () => {
        this.setState({
            subStepIndex: 0
        })
    };
    handleChange = (e: ChangeEvent<HTMLInputElement>) => {console.log(e)};

    render(): JSX.Element {
        return (
            this.state.subStepIndex === -1
            ?  <div>
                    <h2>{content.heading}</h2>
                    <p>{content.paragraph}</p>
                    <div>
                        <Input
                            name={content.input.name}
                            type={content.input.type}
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
            :   checkBalanceStepList[ECheckBalanceSteps.CHECK_WALLET].subComponents[this.state.subStepIndex]
        );
    }
}
