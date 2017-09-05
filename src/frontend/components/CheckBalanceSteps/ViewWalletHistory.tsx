import * as React from 'react';

interface IProps {}

interface IState {}

export class ViewWalletHistory extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>Your wallet's transaction history</h2>
            </div>
        );
    }
}
