import * as React from 'react';

interface IProps {}

interface IState {}

export class SendFunds extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>Time to send the funds</h2>
                <p>You can contribute in any one of these currencies. Just send your funds to the corresponding address, and within minutes your tokens will be sent to your wallet. You have to make sure that you send the right currency to the right address, because sending bitcoin to an Ethereum wallet, or vise versa, will cause the funds to be lost forever.</p>
            </div>
        );
    }
}
