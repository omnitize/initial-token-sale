import * as React from 'react';
import { createSession } from '../../server-api';
import { state } from '../../state';

const ReCAPTCHA = require('react-google-recaptcha').default;

interface IProps {}

interface IState {}

export class GetStarted extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>What you need to know to get started</h2>
                <ul>
                    <li>You can a send funds in Bitcoin or Ethereum. The exchange rate is imported every 5 minutes from Poloniex.</li>
                </ul>
                <h2>Prove you're a human being</h2>
                <p>Before we begin, we need to make sure that you're not a bot. Hackers use bots to flood web sites with seemingly legitimate requests, in order to cause congestion and lock out legitimate users. The box below is Google's recaptcha, a tool that protects internet users from spam and abuse.</p>
                <ReCAPTCHA ref="recaptcha" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={this.onCaptcha} />
            </div>            
        );
    }

    private onCaptcha(value: string) {
        createSession(value)
        .then(({ sessionToken }) => {
            state.sessionToken = sessionToken;
            state.stepNumber++;
        });
    }
}
