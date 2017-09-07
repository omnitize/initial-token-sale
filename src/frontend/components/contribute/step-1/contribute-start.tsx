import * as React from 'react';
import { contributeStartContent as content } from '../../../data/text-data';
import { ProveYouAreHuman } from '../../../common/prove-you-are-human';
import { setState, incrementStep } from '../../../state';

interface IProps {}

interface IState {}

export class ContributeStart extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
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

    private onCaptchaSuccess(sessionToken: string) {
        setState( { sessionToken });
        incrementStep();
    }
}
