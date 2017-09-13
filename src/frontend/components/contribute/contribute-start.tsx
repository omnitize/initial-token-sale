import * as React from 'react';
import { contributeStartContent as content } from '../../data/text-data';
import { ProveYouAreHuman } from '../../common/prove-you-are-human';
import { setState, incrementStep } from '../../state/index';
import { State } from '../../models';

interface IContributeStartProps {
    state?: State
}

export class ContributeStart extends React.Component<IContributeStartProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.onCaptchaSuccess = this.onCaptchaSuccess.bind(this);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>
                    {content.heading}
                </h2>
                <ul>
                {content.list.map((listText, i) =>
                    <li key={`list-${i}`}>
                        {listText}
                    </li>)}
                </ul>
                <ProveYouAreHuman onSuccess={ this.onCaptchaSuccess } />
            </div>
        );
    }

    private onCaptchaSuccess(result) {
        if(this.props.state.sessionToken) return;
        setState({ sessionToken: result.sessionToken, clientConfig: result.clientConfig });
        incrementStep();
    }
}
