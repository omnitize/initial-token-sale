import * as React from 'react';
import { IShadeStyle } from '../../../models';

interface ICircleStepProps {
    index: number
    selectedStep: number
    backgroundStyle: IShadeStyle
    onClick: (index: number) => void
}

export class CircleStep extends React.Component<ICircleStepProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div
                className="its-circle-step"
                style={this.props.backgroundStyle}
                onClick={this.handleClick}>
                <div className="its-circle-step-text">
                    {`${this.props.index + 1}`}
                </div>
            </div>
        );
    }

    private handleClick = () => {
        this.props.onClick(this.props.index);
    };
}
