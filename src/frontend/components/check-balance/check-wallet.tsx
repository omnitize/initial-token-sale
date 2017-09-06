import * as React from 'react';
import { checkWalletContent as content } from '../../data/text-data';

interface IProps {}

interface IState {}

export class CheckWallet extends React.Component<IProps, IState> {

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
