import * as React from 'react';
import { WalletHistory } from '../../../common';

interface IProps {}

interface IState {}

export class ViewWalletHistory extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <WalletHistory/>
            </div>
        );
    }
}
