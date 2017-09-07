import * as React from 'react';
import { alreadyHaveWalletContent as content } from '../../../../data/text-data';
import { InputText, InputCheckbox, ButtonMain } from '../../../../common';

interface IProps {}

interface IState {}

export class AlreadyHaveWallet extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <p>{content.paragraph}</p>
                <InputText
                    name={content.inputText.name}
                    label={content.inputText.label}
                    onChange={this.handleWalletAddressChange}
                />
                <InputCheckbox
                    name={content.inputCheckbox.name}
                    label={content.inputCheckbox.label}
                    onChange={this.handleWalletAddressChange}
                />
                <ButtonMain
                    onClick={this.handleContinue}>
                    {content.buttonMain}
                </ButtonMain>
            </div>
        );
    }

    private handleWalletAddressChange = () => {};
    private handleContinue = () => {};

}
