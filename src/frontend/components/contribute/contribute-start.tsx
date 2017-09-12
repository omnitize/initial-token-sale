import * as React from 'react';
import { contributeStartContent as content } from '../../data/text-data';
import { ProveYouAreHuman } from '../../common/prove-you-are-human';
import { contributeStartCaptchaSuccess} from '../../state/index';
import { State } from '../../models';

interface IContributeStartProps {
    state?: State
}

export class ContributeStart extends React.Component<IContributeStartProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>
                    {content.heading}
                </h2>
                <ul>
                {content.list.map((listText: string, i: number) =>
                    <li key={`list-${i}`}>
                        {listText}
                    </li>)}
                </ul>
                <ProveYouAreHuman onSuccess={ ContributeStart.onCaptchaSuccess } />
            </div>
        );
    }

    static onCaptchaSuccess(sessionToken: string) {
        contributeStartCaptchaSuccess(sessionToken);
    }
}
