import * as React from 'react';
import { walletHistoryContent as content } from '../../data/text-data';
import { loadTransactions } from '../../server-api';
import { State } from '../../models';
import { setState } from '../../state';
import { getTxStatusIcon } from './tx-status-icon';
const dateFormat = require('dateformat');

interface IWalletHistoryTableProps {
    state?: State;
}

export class WalletHistoryTable extends React.Component<IWalletHistoryTableProps, any> {

    intervalId: any;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.loadTransactions = this.loadTransactions.bind(this);
    }

    private loadTransactions() {
        if(!this.props.state.targetAddress || !this.props.state.sessionToken) return;
        loadTransactions(this.props.state.sessionToken, this.props.state.targetAddress)
        .then(({ transactions }) => setState({ transactions }));        
    }

    componentDidMount() {
        this.loadTransactions();
        this.intervalId = setInterval(this.loadTransactions, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    private getMinConfirmations(currency: string) {
        return this.props.state.clientConfig[`${currency}MinimumConfirmations`] || 0;
    }

    private renderTransactions() {
        return this.props.state.transactions.map((tr, i) => (
            <tr key={`tr-${i}`}>
                <td>{dateFormat(tr.created, 'yyyy-mm-dd HH:MM:ss')}</td>
                <td>{getTxStatusIcon(tr.status, tr.confirmations, this.getMinConfirmations(tr.currency))}</td>
                <td>{tr.value}</td>
                <td>{tr.price}</td>
                <td>{tr.discountPerc}%</td>
                <td>{tr.tokensEarned}</td>
            </tr>
        ));
    }

    render(): JSX.Element {
        return (
            <div className="its-wallet-history-table">
                <table>
                    <tbody>
                        <tr>
                        {content.tableColumns.map((columnHeading, i) =>
                            <th key={`${columnHeading}-${i}`}>
                                {columnHeading}
                            </th>)}
                        </tr>
                        { this.renderTransactions() }
                    </tbody>
                </table>
            </div>
        );
    }
}
