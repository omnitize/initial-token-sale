import * as React from 'react';

interface IProps {}

interface IState {}

export class GetStarted extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>What you need to know to get started</h2>
                <ul>
                    <li>You can a send funds in Bitcoin or Ethereum. The exchange rate is imported every 5 minutes from Poloniex.</li>
                </ul>
            </div>
        );
    }
}
