import * as React from 'react';
import { WalletHistory } from '../../../common';
import { State } from '../../../models';

interface IProps {
    state?: State
}

export class ViewWalletHistory extends React.Component<IProps, any> {

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
