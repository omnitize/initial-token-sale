import * as React from 'react';
import { alreadyHaveWalletContent as content } from '../../../../data/text-data';
import { InputText, InputCheckbox, ButtonMain, ValidationError } from '../../../../common';
import { changeCheckValidationError, changeTextValidationError, alreadyHaveWalletContinue
    , setSubStepMounted, typeWalletAddress, checkDoubleCheckedAddress
} from '../../../../state';
import { EWhereToSendFundsSubSteps, State } from '../../../../models';
import { sendTargetAddress } from '../../../../server-api';
import { isWalletAddressValid } from '../../../../utils';

interface IAlreadyHaveWalletProps {
    state?: State
}

export class AlreadyHaveWallet extends React.Component<IAlreadyHaveWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET)
    }

    render(): JSX.Element {
        const { targetAddress, isDoubleCheckedAddress, validationCheckboxError
            , validationTextError } = this.props.state;
        const isContinueValid = isDoubleCheckedAddress && targetAddress.length > 0 && isWalletAddressValid(targetAddress);

        return (
            <div
                className="its-already-have-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <p>
                    {content.paragraph}
                </p>
                <ValidationError message={validationTextError}>
                    <InputText
                        name={content.inputText.name}
                        value={targetAddress}
                        label={content.inputText.label}
                        onChange={this.handleWalletAddressChange}
                    />
                </ValidationError>
                <ValidationError message={validationCheckboxError}>
                    <InputCheckbox
                        name={content.inputCheckbox.name}
                        value={isDoubleCheckedAddress}
                        paragraph={content.inputCheckbox.paragraph}
                        onChange={this.handleDoubleCheckedAddressChange}
                    />
                </ValidationError>
                <div className="--its-continue">
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
        const isMounted = this.props.state.currentSubStepMounted === EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET;
        return {
            opacity: isMounted ? 1 : 0
        }
    }

    private textValidationError() {
        const address: string = this.props.state.targetAddress;
        return address.length > 0
            ? isWalletAddressValid(address)
                ? ""
                : "Invalid Wallet Address."
            : "Wallet address field cannot be empty";
    }

    private checkValidationError() {
        return this.props.state.isDoubleCheckedAddress
            ? ""
            : "Please confirm you have read and understood the above paragraph.";
    }

    private handleValidationErrors = () => {
        changeTextValidationError(this.textValidationError());
        changeCheckValidationError(this.checkValidationError());
    };

    private handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeWalletAddress(e.currentTarget.value);
    };

    private handleDoubleCheckedAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkDoubleCheckedAddress(e.currentTarget.checked);
    };

    private handleContinueClick = () => {
        return sendTargetAddress(this.props.state.sessionToken, this.props.state.targetAddress)
            .then(({ fundAddresses }) => {
                alreadyHaveWalletContinue(fundAddresses);
            });
    };
}


