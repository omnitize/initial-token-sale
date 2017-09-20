import * as React from 'react';
import { walletHistoryContent as content } from '../../data/text-data'
import { ButtonMain } from '..';
import { WalletHistoryTable } from './wallet-history-table';
import { ECheckBalanceSteps, EContributeSteps, State } from '../../models';
import { downloadWallet } from '../../utils';

interface IWalletHistoryProps {
    stepEnum: EContributeSteps | ECheckBalanceSteps
    state?: State;
}

export class WalletHistory extends React.Component<IWalletHistoryProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    renderButtonsIfWalletCreated(): JSX.Element {
        return this.props.state.targetWallet
            ? (
                <div>
                    <ButtonMain
                        onClick={this.handleDownloadClick}>
                        {content.button}
                    </ButtonMain>
                    <ButtonMain
                        onClick={this.handlePrintWallet}>
                        {content.button2}
                    </ButtonMain>
                </div>)
            :   null;
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <WalletHistoryTable
                    stepEnum={this.props.stepEnum}
                    state={this.props.state}
                />
                { this.renderButtonsIfWalletCreated() }
            </div>
        );
    }

    private handlePrintWallet = () => {
        if (window) {
            window.print();
        }
    };

    private handleDownloadClick = () => {
        downloadWallet(this.props.state.targetWallet, this.props.state.targetAddress);
    };
}


