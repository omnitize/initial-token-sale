import * as React from 'react';
import { createWalletContent as content } from '../../../../data/text-data';
import { ButtonText, ButtonMain, InputCheckbox } from '../../../../common';
import { incrementStep, setSubStep, setSubStepMounted, createWallet } from '../../../../state';
import { EWhereToSendFundsSubSteps, State } from '../../../../models';
import { sendTargetAddress } from '../../../../server-api';

interface ICreateWalletProps {
    state?: State
}

export class CreateWallet extends React.Component<ICreateWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        createWallet();
    }

    componentDidMount() {
        setSubStepMounted(EWhereToSendFundsSubSteps.CREATE_WALLET);
    }

    render(): JSX.Element {
        return (
            <div
                className="its-create-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <p>{content.paragraph}</p>
                <p>{this.props.state.targetMnemonicPhrase}</p>
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadClick}>
                    {content.buttonText}
                </ButtonText>
                <p>{content.paragraph3}</p>
                <h4>{content.heading}</h4>
                <p>{this.props.state.targetAddress}</p>
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    label={content.inputCheckbox.label}
                    onChange={this.handleWrittenMnemonicPhraseChange}
                />
                <ButtonMain onClick={this.handleContinue}>
                    {content.buttonMain}
                </ButtonMain>
            </div>
        );
    }

    private fadeTransitionStyle() {
        const isMounted = this.props.state.currentSubStepMounted === EWhereToSendFundsSubSteps.CREATE_WALLET;
        return {
            opacity: isMounted ? 1 : 0
        }
    }

    private handleDownloadClick = () => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.props.state.targetWallet));
        element.setAttribute('download', `UTC-${this.props.state.targetAddress}`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    private handleWrittenMnemonicPhraseChange = () => {};

    private handleContinue = () => {
        return sendTargetAddress(this.props.state.sessionToken, this.props.state.targetAddress)
        .then(() => {
            setSubStep(-1);
            incrementStep();
        });
    };
}
