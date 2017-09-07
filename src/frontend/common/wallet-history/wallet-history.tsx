import * as React from 'react';
import { walletHistoryContent as content } from '../../data/text-data'
import { ButtonMain } from '../';
import { WalletHistoryTable } from './wallet-history-table';

interface IProps {}

export class WalletHistory extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <WalletHistoryTable/>
                <ButtonMain
                    onClick={this.handleDownloadWallet}>
                    {content.button}
                </ButtonMain>
                <ButtonMain
                    onClick={this.handlePrintWallet}>
                    {content.button2}
                </ButtonMain>
            </div>
        );
    }

    private handleDownloadWallet = () => {};

    private handlePrintWallet = () => {};

}
