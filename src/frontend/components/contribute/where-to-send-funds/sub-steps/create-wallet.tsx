import * as React from 'react';
import { createWalletContent as content } from '../../../../data/text-data';
import { ButtonText, ButtonMain, InputCheckbox, ValidationError, BackgroundHighlight, Spinner  } from '../../../../common';
import { createWalletContinue, setSubStepMounted, setSubStepUnmounted, checkWrittenMnemonicPhrase
    , changeCheckValidationError, setNextState } from '../../../../state';
import { EWhereToSendFundsSubSteps, IWalletInfo, State } from '../../../../models';
import { sendTargetAddress } from '../../../../server-api';
import { downloadWallet, createWallet } from '../../../../utils';

interface ICreateWalletProps {
    state?: State
}

export class CreateWallet extends React.Component<ICreateWalletProps, any> {

    createWalletTimeerId: any;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(EWhereToSendFundsSubSteps.CREATE_WALLET);
        if(!this.props.state.targetWallet) {
            this.createWalletTimeerId = setTimeout(() => {
                createWallet()
                    .then((walletInfo: IWalletInfo) => setNextState(walletInfo))
                    .catch((err) => console.error(err));
            }, 100);
            // delay so that "please wait" message had time to render
        }
    }

    componentWillUnmount(){
        setSubStepUnmounted();
        clearTimeout(this.createWalletTimeerId);
    }

    render(): JSX.Element {
        const { targetMnemonicPhrase, targetAddress, isWrittenMnemonicPhrase
            , validationCheckboxError, isLoading } = this.props.state;
        const isContinueValid = isWrittenMnemonicPhrase;

        return (
            this.props.state.targetWallet
                ?   (<div
                        className="its-create-wallet --its-transition-opacity"
                        style={this.fadeTransitionStyle()}>
                        <p>
                            {content.paragraph}
                        </p>
                        <BackgroundHighlight>
                            {targetMnemonicPhrase}
                        </BackgroundHighlight>
                        <p>
                            {content.paragraph2}
                        </p>
                        <ButtonText onClick={this.handleDownloadClick}>
                            {content.buttonText}
                        </ButtonText>
                        <p>
                            {content.paragraph3}
                        </p>
                        <h4>
                            {content.heading}
                        </h4>
                        <BackgroundHighlight>
                            {targetAddress}
                        </BackgroundHighlight>
                        <ValidationError message={validationCheckboxError}>
                            <InputCheckbox
                                name={content.inputCheckbox.name}
                                paragraph={content.inputCheckbox.paragraph}
                                value={isWrittenMnemonicPhrase}
                                onChange={this.handleWrittenMnemonicPhraseChange}
                            />
                        </ValidationError>
                        <div className="--its-continue">
                            {isLoading
                                ?   <Spinner size={40}/>
                                :   <ButtonMain
                                        isDisabled={!isContinueValid}
                                        onClick={isContinueValid ? this.handleContinueClick : this.handleValidationErrors}>
                                        {content.buttonMain}
                                    </ButtonMain>}
                        </div>
                    </div>)
                :   (<div style={this.fadeTransitionStyle()}>
                        <p className="its-create-wallet__please-wait">{content.pleaseWait}</p>
                    </div>)
        );
    }

    private fadeTransitionStyle() {
        const isMounted = this.props.state.currentSubStepMounted === EWhereToSendFundsSubSteps.CREATE_WALLET;
        return {
            opacity: isMounted ? 1 : 0
        }
    }

    private checkValidationError() {
        return this.props.state.isWrittenMnemonicPhrase
            ? ""
            : "Please confirm you have read and understood the above paragraph.";
    }

    private handleValidationErrors = () => {
        changeCheckValidationError(this.checkValidationError());
    };

    private handleDownloadClick = () => {
        downloadWallet(this.props.state.targetWallet, this.props.state.targetAddress);
    };

    private handleWrittenMnemonicPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkWrittenMnemonicPhrase(e.currentTarget.checked);
    };

    private handleContinueClick = () => {
        setNextState({isLoading: true});
        sendTargetAddress(this.props.state.sessionToken, this.props.state.targetAddress)
        .then(({ fundAddresses }) => {
            createWalletContinue(fundAddresses)
        });
    };
}
