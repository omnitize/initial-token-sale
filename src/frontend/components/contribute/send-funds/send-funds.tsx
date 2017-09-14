import * as React from 'react';
import { sendFundsContent as content } from '../../../data/text-data'
import { WalletHistory, BackgroundHighlight } from '../../../common';
import { State, FundAddress, EContributeSteps } from '../../../models';
import { CurrencyAddress } from './currency-address';

interface ISendFundsProps {
    state?: State
}

export class SendFunds extends React.Component<ISendFundsProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { state } = this.props;
        return (
            <div>
                <div className="--its-content-section">
                    <h2>
                        {content.heading}
                    </h2>
                    <div>
                        {content.paragraphs.map((paragraph: string, i: number) =>
                            <p key={`paragraph-${i}`}>
                                {paragraph}
                            </p>)}
                    </div>
                    {state.fundAddresses
                        ?   state.fundAddresses.length === 0
                            ?   <BackgroundHighlight>
                                    {"No fund addresses to display at this point."}
                                </BackgroundHighlight>
                            :   <div>
                                    { this.renderFundAddresses() }
                                </div>
                        :   null}
                </div>
                <div className="--its-content-section">
                    <WalletHistory
                        stepEnum={EContributeSteps.SEND_FUNDS}
                        state={state}
                    />
                </div>
            </div>
        );
    }

    private renderFundAddresses() {
        return this.props.state.fundAddresses.map(
            (fa: FundAddress, i: number) =>
                <CurrencyAddress
                    key={`CurrencyAddress-${i}`}
                    currency={fa.currency}
                    price={fa.price}
                    address={fa.address}
                />
        );
    }
}
