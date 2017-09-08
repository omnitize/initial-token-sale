import * as React from 'react';

interface IButtonTextProps {
    onClick: () => void
}

export class ButtonText extends React.Component<IButtonTextProps, any> {

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
