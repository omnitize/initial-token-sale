import * as React from 'react';
import { vendorLogos } from '../../../data/image-data';
import { BackgroundHighlight } from '../../../common';

interface ICurrencyAddressProps {
    currency: string;
    address: string;
    price: number;
}

export class CurrencyAddress extends React.Component<ICurrencyAddressProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="its-currency-address__inner">
                    <div className="its-currency-address__logo">
                        {vendorLogos[this.props.currency]}
                    </div>
                    <div className="its-currency-address__price">
                        <BackgroundHighlight>
                            ({this.props.price} per token)
                        </BackgroundHighlight>
                    </div>
                    <div className="its-currency-address__address">
                        <BackgroundHighlight>
                            {this.props.address}
                        </BackgroundHighlight>
                    </div>
                </div>
            </div>
        );
    }
}
