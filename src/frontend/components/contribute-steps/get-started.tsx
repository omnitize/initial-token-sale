import * as React from 'react';
import { getStartedContent as content } from '../../data/steps-page-data/contribute';
import { ProveYouAreHuman } from '../check-balance-steps/prove-you-are-human';

interface IProps {}

interface IState {}

export class GetStarted extends React.Component<IProps, IState> {

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
                <ProveYouAreHuman/>
            </div>
        );
    }
}
