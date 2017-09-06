import * as React from 'react';

interface IProps {}

interface IState {}

export class WhereToSendFunds extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>Lets us know where to send your tokens</h2>
                <p>Welcome, human!</p>
            </div>
        );
    }
}
