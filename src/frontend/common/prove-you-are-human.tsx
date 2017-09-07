import * as React from 'react';
import { proveYouAreHumanContent as content } from '../data/text-data';
const ReCAPTCHA = require('react-google-recaptcha').default;
import { config } from '../config';
import { createSession } from '../server-api';

interface IProps {
    onSuccess: (sessionToken: string) => void;
}

interface IState {}

export class ProveYouAreHuman extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.onCaptcha = this.onCaptcha.bind(this);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <p>{ content.paragraph }</p>
                <ReCAPTCHA ref="recaptcha" sitekey={ config.recaptchaSiteKey } onChange={ this.onCaptcha } />
            </div>
        );
    }

    private onCaptcha(value: string) {
        createSession(value)
        .then(({ sessionToken }) => {
            this.props.onSuccess(sessionToken);
        });
    }
}
