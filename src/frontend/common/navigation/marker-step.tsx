import * as React from 'react';
import { LineLeft, LineRight, CircleStep } from './lines';
import { maxSteps } from '../../state';

interface IMarkerStepProps {
    index: number
    name: string
    selectedStep: number
}

export class MarkerStep extends React.Component<IMarkerStepProps, any> {

    stepsNumber = maxSteps();
    divisionSize = 100 / this.stepsNumber;
    stepWidthStyle = {width: `${this.divisionSize}%`};

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { index, name } = this.props;
        return (
            <div className="its-marker-step"
                 style={this.stepWidthStyle}>
                <div className="its-marker-step-circles">
                    <CircleStep
                        index={index}
                        selectedStep={this.props.selectedStep}
                        stepClass={this.stepClass()}/>
                    {(index === 0)
                        ? null
                        : <LineLeft
                            stepClass={this.stepClass()}
                          />}
                    {(index === this.stepsNumber - 1)
                        ? null
                        : <LineRight
                            stepClass={this.stepClass()}
                          />}
                </div>
                <div className={`its-marker-step-name ${this.stepClass()}`}>
                    {name}
                </div>
            </div>
        );
    }

    private stepClass() {
        const { selectedStep, index } = this.props;
        return selectedStep === index
                ? "--selected"
                : selectedStep > index
                    ? "--completed"
                    : ""
    }
}
