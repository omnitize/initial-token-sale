import * as React from 'react';
const dateFormat = require('dateformat');
import { walletHistoryContent as content } from '../../data/text-data';
import { loadTransactions } from '../../server-api';
import { ECheckBalanceSteps, EContributeSteps, State } from '../../models';
import { setState } from '../../state';
import { getTxStatusIcon } from './tx-status-icon';
import { Spinner, BackgroundHighlight } from '..';

interface IWalletHistoryTableProps {
    stepEnum: EContributeSteps | ECheckBalanceSteps
    state?: State;
}

export class WalletHistoryTable extends React.Component<IWalletHistoryTableProps, any> {

    intervalId: any;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.currentStep !== this.props.state.currentStep
        && nextProps.state.currentStep === nextProps.stepEnum) {
            this.handleLoadTransactions();
            this.intervalId = setInterval(this.handleLoadTransactions, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render(): JSX.Element {
        const { transactions, isLoading } = this.props.state;
        return (
            <div className="its-wallet-history-table">
                <table>
                    <tbody>
                        <tr>
                        { content.tableColumns.map((columnHeading, i) =>
                            <th key={`${columnHeading}-${i}`}>
                                {columnHeading}
                            </th>) }
                        </tr>
                        { transactions
                            ?   transactions.length === 0
                                ?   WalletHistoryTable.renderEmptyRow()
                                :   this.renderTransactions()
                            :   null}
                    </tbody>
                </table>
                {isLoading
                    ?   <Spinner size={40}/>
                    :   transactions.length === 0
                        ?   <BackgroundHighlight>
                                {"No transactions to display at this point."}
                            </BackgroundHighlight>
                        :   null}
            </div>
        );
    }

    static renderEmptyRow() {
        return  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>;
    }

    private handleLoadTransactions = () => {
        if(!this.props.state.targetAddress || !this.props.state.sessionToken) {
            return;
        } else {
            setState({isLoading: true});
            loadTransactions(this.props.state.sessionToken, this.props.state.targetAddress)
                .then(({ transactions }) => {
                    setState({ transactions, isLoading: false })
                    clearInterval(this.intervalId);
                });
        }
    };

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
}
