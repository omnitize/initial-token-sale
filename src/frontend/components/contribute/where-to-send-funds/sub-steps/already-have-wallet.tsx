import * as React from 'react';
import { alreadyHaveWalletContent as content } from '../../../../data/text-data';
import { InputText, InputCheckbox, ButtonMain, ValidationError } from '../../../../common';
import { setSubStep, incrementStep, setSubStepMounted, typeWalletAddress, checkDoubleCheckedAddress, setState
    , changeCheckValidationError, changeTextValidationError
} from '../../../../state';
import { EWhereToSendFundsSubSteps, State } from '../../../../models';
import { sendTargetAddress } from '../../../../server-api';

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
        const { targetAddress, isDoubleCheckedAddress, validationCheckboxError, validationTextError } = this.props.state;
        const isContinueValid = isDoubleCheckedAddress && targetAddress.length > 0;

        return (
            <div
                className="its-already-have-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <p>
                    {content.paragraph}
                </p>
                <InputText
                    name={content.inputText.name}
                    value={targetAddress}
                    label={content.inputText.label}
                    onChange={this.handleWalletAddressChange}
                />
                <ValidationError>
                    {validationTextError}
                </ValidationError>
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    value={isDoubleCheckedAddress}
                    paragraph={content.inputCheckbox.paragraph}
                    onChange={this.handleDoubleCheckedAddressChange}
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
        const isMounted = this.props.state.currentSubStepMounted === EWhereToSendFundsSubSteps.ALREADY_HAVE_WALLET;
        return {
            opacity: isMounted ? 1 : 0
        }
    }

    private handleValidationErrors = () => {
        const { targetAddress, isDoubleCheckedAddress } = this.props.state;
        changeTextValidationError(targetAddress.length > 0 ? "" : "Wallet address field cannot be empty");
        changeCheckValidationError(isDoubleCheckedAddress ? "" : "Please check checkbox");
    };

    private handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeWalletAddress(e.currentTarget.value);
    };

    private handleDoubleCheckedAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkDoubleCheckedAddress(e.currentTarget.checked);
    };

    private handleContinue = () => {
        return sendTargetAddress(this.props.state.sessionToken, this.props.state.targetAddress)
            .then(({ fundAddresses }) => {
                setState({ fundAddresses });
                setSubStep(-1);
                incrementStep();
            });
    };
}


