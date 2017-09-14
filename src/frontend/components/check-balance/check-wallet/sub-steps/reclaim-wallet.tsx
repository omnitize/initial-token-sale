import * as React from 'react';
import { reclaimWalletContent as content } from '../../../../data/text-data'
import { ButtonMain, ButtonText, InputText, BackgroundHighlight, ValidationError } from '../../../../common';
import { ECheckWalletSubSteps, State } from '../../../../models';
import { setSubStepMounted, setSubStepUnmounted, reclaimWalletContinue, typeMnemonicPhrase
    , changeTextValidationError } from '../../../../state';
import { downloadWallet } from '../../../../utils';

interface IReclaimWalletProps {
    state?: State
}

export class ReclaimWallet extends React.Component<IReclaimWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(ECheckWalletSubSteps.RECLAIM_WALLET)
    }

    componentWillUnmount() {
        setSubStepUnmounted();
    }

    render(): JSX.Element {
        const { targetMnemonicPhrase, targetAddress, validationTextError } = this.props.state;
        const isContinueValid = targetMnemonicPhrase.length > 0;

        return (
            <div
                className="its-reclaim-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <h2>
                    {content.heading}
                </h2>
                <p>
                    {content.paragraph}
                </p>
                <ValidationError message={validationTextError}>
                    <InputText
                        label={content.heading2}
                        value={targetMnemonicPhrase}
                        name={content.input.name}
                        onChange={this.handleMnemonicPhraseChange}
                    />
                </ValidationError>
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadWalletClick}>
                    {content.buttonText}
                </ButtonText>
                <p>
                    {content.paragraph3}
                </p>
                <h4>
                    {content.heading3}
                </h4>
                <BackgroundHighlight>
                    {targetAddress}
                </BackgroundHighlight>
                <div>
                    <ButtonMain
                        isDisabled={!isContinueValid}
                        onClick={isContinueValid ? this.handleContinueClick : this.handleValidationErrors}>
                        {content.buttonMain}
                    </ButtonMain>
                </div>
            </div>
        );
    }

    private fadeTransitionStyle() {
        const isMounted = this.props.state.currentSubStepMounted === ECheckWalletSubSteps.RECLAIM_WALLET;
        return {
            opacity: isMounted ? 1 : 0
        }
    }

    private handleDownloadWalletClick = () => {
        downloadWallet(this.props.state.targetWallet, this.props.state.targetAddress);
    };

    private textValidationError() {
        const phrase: string = this.props.state.targetMnemonicPhrase;
        return phrase.length > 0
            ? ""
            : "Mnemonic phrase field cannot be empty";
    }

    private handleValidationErrors = () => {
        changeTextValidationError(this.textValidationError());
    };

    private handleContinueClick = () => {
        reclaimWalletContinue();
    };

    private handleMnemonicPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeMnemonicPhrase(e.currentTarget.value)
    };
}
