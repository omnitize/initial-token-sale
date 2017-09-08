import * as React from 'react';
import { WalletHistory } from '../../../common';
import { State } from '../../../models';

interface IViewWalletHistoryProps {
    state?: State
}

export class ViewWalletHistory extends React.Component<IViewWalletHistoryProps, any> {

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
