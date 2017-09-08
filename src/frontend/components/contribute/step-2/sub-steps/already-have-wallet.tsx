import * as React from 'react';
import { alreadyHaveWalletContent as content } from '../../../../data/text-data';
import { InputText, InputCheckbox, ButtonMain } from '../../../../common';
import { setSubStep, incrementStep, setSubStepMounted, setState } from '../../../../state';
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
        return (
            <div
                className="its-already-have-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <p>{content.paragraph}</p>
                <InputText
                    value={this.props.state.targetAddress}
                    name={content.inputText.name}
                    label={content.inputText.label}
                    onChange={this.handleChange}
                />
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    label={content.inputCheckbox.label}
                    onChange={()=>null}
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

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ targetAddress: event.target.value });
    };

    private handleContinue = () => {
        return sendTargetAddress(this.props.state.sessionToken, this.props.state.targetAddress)
        .then(() => {
            setSubStep(-1);
            incrementStep();
        });
    };
}

