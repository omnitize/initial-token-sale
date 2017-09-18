import * as React from 'react';
import { WalletHistory } from '../../common';
import { ECheckBalanceSteps, State } from '../../models';

interface IViewWalletHistoryProps {
    state?: State
}

export class ViewWalletHistory extends React.Component<IViewWalletHistoryProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div className="--its-content-section">
                <WalletHistory
                    stepEnum={ECheckBalanceSteps.VIEW_WALLET_HISTORY}
                    state={this.props.state}
                />
            </div>
        );
    }
}
