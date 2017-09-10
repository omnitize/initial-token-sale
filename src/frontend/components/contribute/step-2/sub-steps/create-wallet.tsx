import * as React from 'react';
import { createWalletContent as content } from '../../../../data/text-data';
import { ButtonText, ButtonMain, InputCheckbox } from '../../../../common';
import { incrementStep, setSubStep, setSubStepMounted, checkWrittenMnemonicPhrase, createWallet } from '../../../../state';
import { EWhereToSendFundsSubSteps, State } from '../../../../models';

interface ICreateWalletProps {
    state?: State
}

export class CreateWallet extends React.Component<ICreateWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(EWhereToSendFundsSubSteps.CREATE_WALLET)
        if(!this.props.state.targetWallet) {
            setTimeout(createWallet, 100);
        }
    }

    render(): JSX.Element {
        debugger;
        if(!this.props.state.targetWallet) {
            return (
                <div
                    className="its-create-wallet --its-transition-opacity"
                    style={this.fadeTransitionStyle()}>
                    <p>{content.pleaseWait}</p>
                </div>
            );
        }
        return (
            <div
                className="its-create-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <p>{content.paragraph}</p>
                {this.props.state.targetMnemonicPhrase}
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadClick}>
                    {content.buttonText}
                </ButtonText>
                <p>{content.paragraph3}</p>
                <h4>{content.heading}</h4>
                {this.props.state.targetAddress}
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    paragraph={content.inputCheckbox.paragraph}
                    value={this.props.state.isWrittenMnemonicPhrase}
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

    private handleWrittenMnemonicPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkWrittenMnemonicPhrase(e.currentTarget.checked);
    };

    private handleContinue = () => {
        setSubStep(-1);
        incrementStep();
    };
}
