import * as React from 'react';
import { sendFundsContent as content } from '../../data/text-data'
import { WalletHistory } from '../../common';

interface IProps {}

interface IState {}

export class SendFunds extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <div>
                    {content.paragraphs.map((paragraph, i) =>
                        <p key={`paragraph-${i}`}>
                            {paragraph}
                        </p>)}
                </div>
                {/*// TODO CREATE SEND FUNDS COMPONENT */}
                <WalletHistory/>
            </div>
        );
    }
}
