import * as React from 'react';
import { contributeStartContent as content } from '../../data/text-data';
import { ProveYouAreHuman } from '../../common/prove-you-are-human';
import { State } from '../../models';
import { contributeStartCaptchaSuccess } from '../../state';

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
                <div className="--its-content-section">
                    <h2>
                        {content.heading}
                    </h2>
                    <ul>
                        {content.list.map((listText, i) =>
                            <li key={`list-${i}`}>
                                {listText}
                            </li>)}
                    </ul>
                </div>
                <div className="--its-content-section">
                    <ProveYouAreHuman onSuccess={ contributeStartCaptchaSuccess } />
                </div>
            </div>
        );
    }
}
