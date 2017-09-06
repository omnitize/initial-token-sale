import * as React from 'react';

interface IProps {
    index: number
    onClick: (index: number) => void
}

interface IState {}

export class ButtonStep extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleClick = () => {
        this.props.onClick(this.props.index);
    };

    render(): JSX.Element {
        return (
            <button
                className="its-button-step"
                onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}
