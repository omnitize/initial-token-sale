import * as React from 'react';
import { checkBalanceStartContent as content } from '../../../data/text-data';

interface IProps {}

interface IState {}

export class CheckBalanceStart extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <p>{content.paragraph}</p>
                {/*// TODO CAPTCHA COMPONENT*/}
            </div>
        );
    }
}
