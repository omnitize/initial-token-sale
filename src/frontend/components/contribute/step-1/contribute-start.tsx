import * as React from 'react';
import { contributeStartContent as content } from '../../../data/text-data';
import { ProveYouAreHuman } from '../../../common/prove-you-are-human';

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
                <ProveYouAreHuman/>
            </div>
        );
    }
}
