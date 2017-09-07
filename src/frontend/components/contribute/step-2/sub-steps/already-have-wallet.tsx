import * as React from 'react';
import { } from ""
import { alreadyHaveWalletContent as content } from '../../../../data/text-data';
import { Input } from '../../../../common/input';
import { ButtonMain } from '../../../../common/button-main';

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
                <Input
                    name={content.textInput.name}
                    type={content.textInput.type}
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
