import * as React from 'react';

interface IProps {}

interface IState {}

export class CheckWalletBalance extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>Check your wallet's balance</h2>
                <p>You can check you wallet's balance by entering your address.</p>
            </div>
        );
    }
}
