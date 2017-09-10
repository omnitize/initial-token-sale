import * as React from 'react';
import { walletHistoryContent as content } from '../../data/text-data'
import { ButtonMain } from '../';
import { WalletHistoryTable } from './wallet-history-table';
import { State } from '../../models';

interface IWalletHistoryProps {
    state?: State;
}

export class WalletHistory extends React.Component<IWalletHistoryProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);        
        this.handlePrintWallet = this.handlePrintWallet.bind(this);        
    }

    renderButtonsIfWalletCreated(): JSX.Element {
        return this.props.state.targetWallet ? (
            <div>
                <ButtonMain
                    onClick={this.handleDownloadClick}>
                    {content.button}
                </ButtonMain>
                <ButtonMain
                    onClick={this.handlePrintWallet}>
                    {content.button2}
                </ButtonMain>
            </div>
        ) : <div></div>;
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <WalletHistoryTable/>
                { this.renderButtonsIfWalletCreated() }
            </div>
        );
    }

    private handlePrintWallet() {
    }

    private handleDownloadClick() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.props.state.targetWallet));
        element.setAttribute('download', `UTC-${this.props.state.targetAddress}`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}


