import * as React from 'react';
import { vendorLogos } from '../../../data/image-data/vendorLogos';

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
                {vendorLogos[this.props.currency]}
                ({this.props.price} per token)
                {this.props.address}
            </div>
        );
    }
}
