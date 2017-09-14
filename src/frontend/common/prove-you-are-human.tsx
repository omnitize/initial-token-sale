import * as React from 'react';
const ReCAPTCHA = require('react-google-recaptcha').default;
import { config } from '../config';
import { createSession } from '../server-api';
import { proveYouAreHumanContent as content } from '../data/text-data';
import { ICaptchaSuccessParams } from '../models';

interface IProveYouAreHumanProps {
    onSuccess: (successParams: ICaptchaSuccessParams) => void;
}

export class ProveYouAreHuman extends React.Component<IProveYouAreHumanProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div className="its-prove-you-are-human">
                <h2>
                    { content.heading }
                </h2>
                <p>
                    { content.paragraph }
                </p>
                <div className="its-prove-you-are-human__recaptcha">
                    <div className="its-prove-you-are-human__recaptcha-checkbox">
                        <ReCAPTCHA
                            ref="recaptcha"
                            sitekey={ config.recaptchaSiteKey }
                            onChange={ this.handleCaptcha }
                        />
                    </div>
                </div>
            </div>
        );
    }

    private handleCaptcha = (value: string) => {
        createSession(value)
        .then(result => this.props.onSuccess(result))
        .catch((err) => console.log(err));
    }
}
