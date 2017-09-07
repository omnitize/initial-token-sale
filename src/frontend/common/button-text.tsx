import * as React from 'react';

interface IProps {
    onClick: () => void
}

export class ButtonText extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <button
                className="its-button-text"
                onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}
