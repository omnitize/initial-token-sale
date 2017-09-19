import * as React from 'react';

interface ICircleStepProps {
    index: number
    selectedStep: number
    stepClass: string
}

export class CircleStep extends React.Component<ICircleStepProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div
                className={`its-circle-step ${this.props.stepClass}`}>
                <div className="its-circle-step-text">
                    {`${this.props.index + 1}`}
                </div>
            </div>
        );
    }
}
