import * as React from 'react';

interface IButtonMainProps {
    onClick: () => void
}

export class ButtonMain extends React.Component<IButtonMainProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <button
                className="its-button-main"
                onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}
