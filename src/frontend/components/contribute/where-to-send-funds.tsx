import * as React from 'react';
import { whereToSendFundsContent as content } from '../../data/text-data'

interface IProps {}

interface IState {}

export class WhereToSendFunds extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <h4>{content.heading2}</h4>
                <p>{content.paragraph}</p>
                <button>{content.button}</button>
                <button>{content.button2}</button>
            </div>
        );
    }
}
