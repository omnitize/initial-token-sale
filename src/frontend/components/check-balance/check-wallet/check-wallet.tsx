import * as React from 'react';
import { checkWalletContent as content } from '../../../data/text-data';
import { ButtonMain, ButtonText, ValidationError } from '../../../common';
import { InputText } from '../../../common/input-text';
import { checkBalanceStepList } from '../../../data/component-data';
import { ECheckBalanceSteps, State } from '../../../models';
import { incrementSubStep, changeTextValidationError, typeWalletAddress } from '../../../state';
import { isWalletAddressValid } from '../../../utils';

interface ICheckWalletProps {
    state?: State
}

export class CheckWallet extends React.Component<ICheckWalletProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { currentSubStep, targetAddress, validationTextError } = this.props.state;
        const isContinueValid = targetAddress.length > 0 && isWalletAddressValid(targetAddress);
        return (
            currentSubStep === -1
                ?  <div>
                        <h2>
                            {content.heading}
                        </h2>
                        <p>
                            {content.paragraph}
                        </p>
                        <div>
                            <ValidationError message={validationTextError}>
                                <InputText
                                    value={targetAddress}
                                    name={content.input.name}
                                    label={content.input.label}
                                    onChange={this.handleWalletAddressChange}
                                />
                            </ValidationError>
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
                                isUnselected={!isContinueValid}
                                onClick={isContinueValid ? this.handleContinue : this.handleValidationErrors}
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

    private textValidationError() {
        const address: string = this.props.state.targetAddress;
        return address.length > 0
            ? isWalletAddressValid(address)
                ? ""
                : "Invalid Wallet Address."
            : "Wallet address field cannot be empty";
    }

    private handleValidationErrors = () => {
        changeTextValidationError(this.textValidationError());
    };

    private handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeWalletAddress(e.currentTarget.value);
    };

    private handleNoWalletAddress = () => {};

    private handleContinue = () => {
        incrementSubStep();
    };

}
