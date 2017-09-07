import * as React from 'react';

interface IProps {
    index: number
    selectedStep: number
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

    backgroundStyle() {
        const { selectedStep, index } = this.props;
        return {
            background: selectedStep === index
                ? "#00E676"
                : selectedStep > index
                    ? "#00C853"
                    : "transparent"
        }
    }

    render(): JSX.Element {
        return (
            <button
                className="its-button-step"
                style={this.backgroundStyle()}
                onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}
