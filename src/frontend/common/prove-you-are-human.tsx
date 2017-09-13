import * as React from 'react';
import { proveYouAreHumanContent as content } from '../data/text-data';
const ReCAPTCHA = require('react-google-recaptcha').default;
import { config } from '../config';
import { createSession } from '../server-api';

interface IProveYouAreHumanProps {
    onSuccess: ({ sessionToken: string, clientConfig: any }) => void;
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
                    <ReCAPTCHA
                        ref="recaptcha"
                        sitekey={ config.recaptchaSiteKey }
                        onChange={ this.onCaptcha }
                    />
                </div>
            </div>
        );
    }

    private onCaptcha(value: string) {
        createSession(value)
        .then(result => this.props.onSuccess)
        .catch((err) => console.log(err));
    }
}
