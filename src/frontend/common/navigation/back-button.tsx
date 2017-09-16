import * as React from 'react';

interface IProps {}

export class BackButton extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <button className="its-back-button">
                <div className="its-back-button__arrow"/>
                <span className="its-back-button__text">
                    back
                </span>
            </button>
        );
    }
}
