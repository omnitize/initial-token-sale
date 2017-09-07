import * as React from 'react';
import { createWalletContent as content } from '../../../../data/text-data';
import { ButtonText, ButtonMain, InputCheckbox } from '../../../../common';
import { incrementStep, setSubStep } from '../../../../state';

interface IProps {}

interface IState {}

export class CreateWallet extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <p>{content.paragraph}</p>
                <p>{content.paragraph2}</p>
                <ButtonText onClick={this.handleDownloadClick}>
                    {content.buttonText}
                </ButtonText>
                <p>{content.paragraph3}</p>
                <h4>{content.heading}</h4>
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    label={content.inputCheckbox.label}
                    onChange={this.handleWrittenMnemonicPhraseChange}
                />
                <ButtonMain onClick={this.handleContinue}>
                    {content.buttonMain}
                </ButtonMain>
            </div>
        );
    }

    private handleDownloadClick = () => {};
    private handleWrittenMnemonicPhraseChange = () => {};
    private handleContinue = () => {
        setSubStep(-1);
        incrementStep();
    };
}
