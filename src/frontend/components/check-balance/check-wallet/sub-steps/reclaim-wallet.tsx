import * as React from 'react';
import { reclaimWalletContent as content } from '../../../../data/text-data'
import { ButtonMain, ButtonText, InputText } from '../../../../common';
import { ECheckWalletSubSteps, State } from '../../../../models';
import { setSubStepMounted, reclaimWalletContinue, typeMnemonicPhrase } from '../../../../state/index';
import { downloadWallet } from '../../../../utils/downloadWallet';

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
        const { targetMnemonicPhrase, targetAddress } = this.props.state;

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
                <div>
                    <h4>
                        {content.heading2}
                    </h4>
                    <InputText
                        value={targetMnemonicPhrase}
                        name={content.input.name}
                        onChange={this.handleMnemonicPhraseChange}
                    />
                </div>
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadWalletClick}>
                    {content.buttonText}
                </ButtonText>
                <p>
                    {content.paragraph3}
                </p>
                <div>
                    <h4>
                        {content.heading3}
                    </h4>
                    <span className="its-reclaim-wallet__wallet-address">
                        {targetAddress}
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

    private handleDownloadWalletClick = () => {
        downloadWallet(this.props.state.targetWallet, this.props.state.targetAddress);
    };

    private handleContinueClick = () => {
        reclaimWalletContinue();
    };

    private handleMnemonicPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        typeMnemonicPhrase(e.currentTarget.value)
    };
}
