import * as React from 'react';
import { viewWalletHistoryContent as content } from '../../data/steps-page-data/check-balance';

interface IProps {}

interface IState {}

export class ViewWalletHistory extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                {/*// TODO SEPARATE INTO WALLET HISTORY TABLE COMPONENT*/}
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
                <button>{content.button}</button>
                <button>{content.button2}</button>
            </div>
        );
    }
}
