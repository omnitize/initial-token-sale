import * as React from 'react';

interface IProps {
    onClick: () => void
}

interface IState {}

export class ButtonMain extends React.Component<IProps, IState> {

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