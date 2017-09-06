import * as React from 'react';
import { checkWalletContent as content } from '../../data/text-data';
import { ButtonMain, ButtonText } from '../../common';
import { Input } from '../../common/input';
import {ChangeEvent} from 'react';

interface IProps {}

interface IState {}

export class CheckWallet extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleNoWalletAddress = () => {};
    handleContinue = () => {};
    handleChange = (e: ChangeEvent<HTMLInputElement>) => {console.log(e)};

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <p>{content.paragraph}</p>
                <div>
                    <Input
                        name={content.input.name}
                        type={content.input.type}
                        label={content.input.label}
                        onChange={this.handleChange}
                    />
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
                        onClick={this.handleContinue}
                    >
                        {content.button2}
                    </ButtonMain>
                </div>
            </div>
        );
    }
}
