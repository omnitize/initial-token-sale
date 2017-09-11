import * as React from 'react';

interface IButtonStepProps {
    index: number
    selectedStep: number
    onClick: (index: number) => void
}

export class ButtonStep extends React.Component<IButtonStepProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
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

    private handleClick = () => {
        this.props.onClick(this.props.index);
    };

    private backgroundStyle() {
        const { selectedStep, index } = this.props;
        return {
            background: selectedStep === index
                ? "#00E676"
                : selectedStep > index
                    ? "#00C853"
                    : "transparent"
        }
    }
}
