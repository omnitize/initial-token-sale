import * as React from 'react';
import { whereToSendFundsContent as content } from '../../../data/text-data'
import {ButtonMain} from '../../../common/button-main';

interface IProps {}

interface IState {}

export class WhereToSendFunds extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleAlreadyHaveWallet = () => {};
    handleCreateWallet = () => {};

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <h4>{content.heading2}</h4>
                <p>{content.paragraph}</p>
                <ButtonMain
                    onClick={this.handleAlreadyHaveWallet}
                >
                    {content.button}
                </ButtonMain>
                <ButtonMain
                    onClick={this.handleCreateWallet}
                >
                    {content.button2}
                </ButtonMain>
            </div>
        );
    }
}
