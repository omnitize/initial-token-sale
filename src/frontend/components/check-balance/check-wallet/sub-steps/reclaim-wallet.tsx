import * as React from 'react';
import { reclaimWalletContent as content } from '../../../../data/text-data'
import { ButtonMain, ButtonText, InputText, BackgroundHighlight, ValidationError } from '../../../../common';
import { ECheckWalletSubSteps, IWalletInfo, State } from '../../../../models';
import { setSubStepMounted, setSubStepUnmounted, reclaimWalletContinue, typeMnemonicPhrase
    , changeTextValidationError, changeTextValidationError2, setNextState } from '../../../../state';
import { downloadWallet, createWallet } from '../../../../utils';

interface IReclaimWalletProps {
    state?: State
}

export class ReclaimWallet extends React.Component<IReclaimWalletProps, any> {

    lookUpWalletTimeerId: any;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(ECheckWalletSubSteps.RECLAIM_WALLET)
    }

    componentWillUnmount() {
        clearTimeout(this.lookUpWalletTimeerId);
        setSubStepUnmounted();
    }

    render(): JSX.Element {
        const { targetMnemonicPhrase, targetAddress, validationTextError
            , validationTextError2, isLoading } = this.props.state;
        const isLookUpWalletValid = targetMnemonicPhrase.length > 0;
        const isContinueValid = targetAddress && targetAddress.length > 0;

        return (
            isLoading
                ?   (<div>
                        <p>{content.pleaseWait}</p>
                    </div>)
                :   (<div
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
                        <div className="--its-continue">
                            <ButtonMain
                                isDisabled={!isLookUpWalletValid}
                                onClick={isLookUpWalletValid
                                    ? this.handleLookUpClick
                                    : this.handleLookUpWalletValidationError}>
                                {content.buttonMain}
                            </ButtonMain>
                        </div>
                        <p>{content.paragraph2}</p>
                        <ButtonText onClick={isContinueValid ? this.handleDownloadWalletClick : this.handleContinueValidationError}>
                            {content.buttonText}
                        </ButtonText>
                        <p>
                            {content.paragraph3}
                        </p>
                        <h4>
                            {content.heading3}
                        </h4>
                        <ValidationError message={validationTextError2}>
                            {(targetAddress && targetAddress.length > 0)
                                ?   <BackgroundHighlight>
                                    {targetAddress}
                                </BackgroundHighlight>
                                :   <BackgroundHighlight>
                                    {"Address not available. Please use a mnemonic phrase to look up address."}
                                </BackgroundHighlight>}
                        </ValidationError>
                        <div className="--its-continue">
                            <ButtonMain
                                isDisabled={!isContinueValid}
                                onClick={isContinueValid ? this.handleContinueClick : this.handleContinueValidationError}>
                                {content.buttonMain2}
                            </ButtonMain>
                        </div>
                    </div>)
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

    private textLookUpWalletError() {
        const phrase: string = this.props.state.targetMnemonicPhrase;
        return phrase.length > 0
            ? ""
            : "Mnemonic phrase field cannot be empty";
    }

    private textContinueError() {
        const phrase: string = this.props.state.targetAddress;
        return phrase.length > 0
            ? ""
            : "No wallet specified.";
    }

    private handleLookUpWalletValidationError = () => {
        changeTextValidationError(this.textLookUpWalletError());
    };

    private handleContinueValidationError = () => {
        changeTextValidationError2(this.textContinueError());
    };

    private handleLookUpClick = () => {
        setNextState({isLoading: true});
        this.lookUpWalletTimeerId = setTimeout(() => {
            createWallet(this.props.state.targetMnemonicPhrase)
                .then((walletObject: IWalletInfo) => setNextState({...walletObject, isLoading: false}))
                .catch((err) => {
                    setNextState({isLoading: false});
                    console.error(err);
                });
        }, 100);
        // delay so that loaders have time to render
    };

    private handleContinueClick = () => {
        reclaimWalletContinue();
    };

    private handleMnemonicPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeMnemonicPhrase(e.currentTarget.value)
    };
}
