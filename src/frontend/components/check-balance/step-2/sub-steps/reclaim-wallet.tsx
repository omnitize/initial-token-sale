import * as React from 'react';
import { reclaimWalletContent as content } from '../../../../data/text-data'
import { ButtonMain } from '../../../../common/button-main';
import { ButtonText } from '../../../../common/button-text';
import { InputText } from '../../../../common/input-text';
import { ChangeEvent } from 'react';
import { setSubStep, setSubStepMounted, incrementStep } from '../../../../state';
import { ECheckWalletSubSteps, State } from '../../../../models';

interface IReclaimWalletProps {
    state?: State
}

export class ReclaimWallet extends React.Component<IReclaimWalletProps, any> {

    walletAddress = "xxxx";

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        setSubStepMounted(ECheckWalletSubSteps.RECLAIM_WALLET)
    }

    render(): JSX.Element {
        return (
            <div
                className="its-reclaim-wallet --its-transition-opacity"
                style={this.fadeTransitionStyle()}>
                <h2>{content.heading}</h2>
                <p>{content.paragraph}</p>
                <InputText
                    value=""
                    name={content.input.name}
                    label={content.input.label}
                    onChange={this.handleMnemonicPhraseChange}
                />
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadWalletClick}>
                    {content.buttonText}
                </ButtonText>
                <p>{content.paragraph3}</p>
                <div>
                    <h4>
                        {content.heading2}
                    </h4>
                    <span className="its-reclaim-wallet__wallet-address">
                        {this.walletAddress}
                    </span>
                </div>
                <ButtonMain onClick={this.handleContinueClick}>
                    {content.buttonMain}
                </ButtonMain>
            </div>
        );
    }

    private fadeTransitionStyle() {
        const isMounted = this.props.state.currentSubStepMounted === ECheckWalletSubSteps.RECLAIM_WALLET;
        return {
            opacity: isMounted ? 1 : 0
        }
    }

    private handleDownloadWalletClick = () => {};

    private handleContinueClick = () => {
        setSubStep(-1);
        incrementStep();
    };

    private handleMnemonicPhraseChange = (e: ChangeEvent<HTMLInputElement>) => {console.log(e)};
}
