import * as React from 'react';
import { createWalletContent as content } from '../../../../data/text-data';
import { ButtonText, ButtonMain, InputCheckbox, ValidationError } from '../../../../common';
import { incrementStep, setSubStep, setSubStepMounted, checkWrittenMnemonicPhrase, createWallet
    , setState, changeCheckValidationError } from '../../../../state';
import { EWhereToSendFundsSubSteps, State } from '../../../../models';
import { sendTargetAddress } from '../../../../server-api';
import { downloadWallet } from '../../../../utils/downloadWallet';
import { BackgroundHighlight } from '../../../../common';

interface ICreateWalletProps {
    state?: State
}

export class CreateWallet extends React.Component<ICreateWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(EWhereToSendFundsSubSteps.CREATE_WALLET);
        if(!this.props.state.targetWallet) {
            setTimeout(createWallet, 100);
        }
    }

    render(): JSX.Element {
        const { targetMnemonicPhrase, targetAddress, isWrittenMnemonicPhrase, isDoubleCheckedAddress
            , validationCheckboxError } = this.props.state;
        const isContinueValid = isDoubleCheckedAddress && targetAddress.length > 0;

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
                <p>
                    {content.paragraph}
                </p>
                {targetMnemonicPhrase}
                <p>
                    {content.paragraph2}
                </p>
                <p>{content.paragraph}</p>
                <BackgroundHighlight>
                    {targetMnemonicPhrase}
                </BackgroundHighlight>
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadClick}>
                    {content.buttonText}
                </ButtonText>
                <p>
                    {content.paragraph3}
                </p>
                <h4>
                    {content.heading}
                </h4>
                {targetAddress}
                <p>
                    {content.paragraph3}
                </p>
                <h4>
                    {content.heading}
                </h4>
                <BackgroundHighlight>
                    {targetAddress}
                </BackgroundHighlight>
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    paragraph={content.inputCheckbox.paragraph}
                    value={isWrittenMnemonicPhrase}
                    onChange={this.handleWrittenMnemonicPhraseChange}
                />
                <ValidationError>
                    {validationCheckboxError}
                </ValidationError>
                <ButtonMain
                    isUnselected={!isContinueValid}
                    onClick={isContinueValid ? this.handleContinue : this.handleValidationErrors}>
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

    private handleValidationErrors = () => {
        changeCheckValidationError(this.props.state.isDoubleCheckedAddress ? "" : "Please check checkbox");
    };

    private handleDownloadClick = () => {
        downloadWallet(this.props.state.targetWallet, this.props.state.targetAddress);
    };

    private handleWrittenMnemonicPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkWrittenMnemonicPhrase(e.currentTarget.checked);
    };

    private handleContinue = () => {
        sendTargetAddress(this.props.state.sessionToken, this.props.state.targetAddress)
        .then(({ fundAddresses }) => {
            setState({ fundAddresses });
            setSubStep(-1);
            incrementStep();
        });
    };
}
