import * as React from 'react';
import { IShadeStyle } from '../../../models';

interface ICircleStepProps {
    index: number
    selectedStep: number
    backgroundStyle: IShadeStyle
}

export class CircleStep extends React.Component<ICircleStepProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div
                className="its-circle-step"
                style={this.props.backgroundStyle}>
                <div className="its-circle-step-text">
                    {`${this.props.index + 1}`}
                </div>
            </div>
        );
    }
}
