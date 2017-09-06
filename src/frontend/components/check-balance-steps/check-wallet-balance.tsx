import * as React from 'react';
import { checkWalletBalanceContent as content } from '../../data/steps-page-data/check-balance';

interface IProps {}

interface IState {}

export class CheckWalletBalance extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <h2>{content.heading}</h2>
                <p>{content.paragraph}</p>
                <label htmlFor={content.input.name}>
                    {content.input.label}
                    <input
                        name={content.input.name}
                        type={content.input.type}
                    />
                </label>
                <button>{content.button}</button>
                <button>{content.button2}</button>
            </div>
        );
    }
}
