import * as React from 'react';
import { createWalletContent as content } from '../../../../data/text-data';
import {ButtonText} from '../../../../common/button-text';
import {ButtonMain} from '../../../../common/button-main';

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
                <ButtonMain onClick={this.handleContinue}>
                    {content.buttonMain}
                </ButtonMain>
            </div>
        );
    }

    private handleDownloadClick = () => {};
    private handleContinue = () => {};
}
