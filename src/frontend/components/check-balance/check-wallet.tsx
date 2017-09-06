import * as React from 'react';
import { checkWalletContent as content } from '../../data/text-data';
import { ButtonMain } from '../../common';

interface IProps {}

interface IState {}

export class CheckWallet extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleNoWalletAddress = () => {};
    handleContinue = () => {};

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <p>{content.paragraph}</p>
                <label htmlFor={content.input.name}>
                    {content.input.label}
                    <input
                        name={content.input.name}
                        type={content.input.type}
                    />
                </label>
                <ButtonMain
                    onClick={this.handleNoWalletAddress}
                >
                    {content.button}
                </ButtonMain>
                <ButtonMain
                    onClick={this.handleContinue}
                >
                    {content.button2}
                </ButtonMain>
            </div>
        );
    }
}
