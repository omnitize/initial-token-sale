import * as React from 'react';
import { proveYouAreHumanContent as content } from '../data/text-data';
const ReCAPTCHA = require('react-google-recaptcha').default;
import { config } from '../config';
import { createSession } from '../server-api';

interface ISuccessParams {
    sessionToken: string
    clientConfig: any
}

interface IProveYouAreHumanProps {
    onSuccess: (successParams: ISuccessParams) => void;
}

interface IState {}

export class ProveYouAreHuman extends React.Component<IProveYouAreHumanProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.onCaptcha = this.onCaptcha.bind(this);
    }

    render(): JSX.Element {
        return (
            <div className="its-prove-you-are-human">
                <h2>{content.heading}</h2>
                <p>{ content.paragraph }</p>
                <div className="its-prove-you-are-human__recaptcha">
                    <div className="its-prove-you-are-human__recaptcha-checkbox">
                        <ReCAPTCHA
                            ref="recaptcha"
                            sitekey={ config.recaptchaSiteKey }
                            onChange={ this.onCaptcha }
                        />
                    </div>
                </div>
            </div>
        );
    }

    private onCaptcha(value: string) {
        createSession(value)
        .then(result => this.props.onSuccess(result))
        .catch((err) => console.log(err));
    }
}
