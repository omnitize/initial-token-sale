import * as React from 'react';
import { sendFundsContent as content } from '../../../data/text-data'
import { WalletHistory } from '../../../common';
import { State, FundAddress } from '../../../models';
import { CurrencyAddress } from './currency-address';

interface ISendFundsProps {
    state?: State
}

export class SendFunds extends React.Component<ISendFundsProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="its-content-section">
                    <h2>
                        {content.heading}
                    </h2>
                    <div>
                        {content.paragraphs.map((paragraph: string, i: number) =>
                            <p key={`paragraph-${i}`}>
                                {paragraph}
                            </p>)}
                    </div>
                    <div>
                        { this.renderFundAddresses() }
                    </div>
                </div>
                <div className="its-content-section">
                    <WalletHistory
                        state={this.props.state}
                    />
                </div>
            </div>
        );
    }

    private renderFundAddresses() {
        return this.props.state.fundAddresses.map(
            (fa: FundAddress, i: number) =>
                <CurrencyAddress
                    key={`fa-${i}`}
                    currency={fa.currency}
                    price={fa.price}
                    address={fa.address}
                />
        );
    }

}
