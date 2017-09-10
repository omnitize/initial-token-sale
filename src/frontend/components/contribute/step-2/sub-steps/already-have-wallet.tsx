import * as React from 'react';
import { alreadyHaveWalletContent as content } from '../../../../data/text-data';
import { InputText, InputCheckbox, ButtonMain } from '../../../../common';
import { setSubStep, incrementStep, setSubStepMounted, typeWalletAddress, checkDoubleCheckedAddress } from '../../../../state';
import { EWhereToSendFundsSubSteps, State } from '../../../../models';

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
        return (
            <div
                className="its-already-have-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <p>{content.paragraph}</p>
                <InputText
                    name={content.inputText.name}
                    value={this.props.state.walletAddress}
                    label={content.inputText.label}
                    onChange={this.handleWalletAddressChange}
                />
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    value={this.props.state.isDoubleCheckedAddress}
                    paragraph={content.inputCheckbox.paragraph}
                    onChange={this.handleDoubleCheckedAddressChange}
                />
                <ButtonMain
                    onClick={this.handleContinue}>
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

    private handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeWalletAddress(e.currentTarget.value);
    };

    private handleDoubleCheckedAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkDoubleCheckedAddress(e.currentTarget.checked);
    };

    private handleContinue = () => {
        setSubStep(-1);
        incrementStep();
    };

}
