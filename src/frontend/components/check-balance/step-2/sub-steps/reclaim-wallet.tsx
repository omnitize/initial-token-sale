import * as React from 'react';
import { reclaimWalletContent as content } from '../../../../data/text-data'
import { ButtonMain } from '../../../../common/button-main';
import { ButtonText } from '../../../../common/button-text';
import { InputText } from '../../../../common/input-text';
import { ChangeEvent } from 'react';
import { setSubStep, incrementStep } from '../../../../state';

interface IProps {}

interface IState {}

export class ReclaimWallet extends React.Component<IProps, IState> {

    walletAddress = "xxxx";

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleDownloadWalletClick = () => {};

    handleContinueClick = () => {
        setSubStep(-1);
        incrementStep();
    };

    handleMnemonicPhraseChange = (e: ChangeEvent<HTMLInputElement>) => {console.log(e)};

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <p>{content.paragraph}</p>
                <InputText
                    name={content.input.name}
                    label={content.input.label}
                    onChange={this.handleMnemonicPhraseChange}/>
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
}
