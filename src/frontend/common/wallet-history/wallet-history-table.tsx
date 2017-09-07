import * as React from 'react';
import { walletHistoryContent as content } from '../../data/text-data'

interface IProps {}

export class WalletHistoryTable extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
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
                    </tbody>
                </table>
            </div>
        );
    }
}
