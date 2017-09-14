import * as React from 'react';
import { LineLeft, LineRight, CircleStep } from './lines';
import { maxSteps, setStep } from '../../state';

interface IButtonStepProps {
    index: number
    name: string
    selectedStep: number
}

export class MarkerStep extends React.Component<IButtonStepProps, any> {

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
                        backgroundStyle={this.shadeStyle("background")}
                        onClick={() => MarkerStep.handleStepNavClick(index)}/>
                    {(index === 0)
                        ? null
                        : <LineLeft
                            backgroundStyle={this.shadeStyle("background")}
                          />}
                    {(index === this.stepsNumber - 1)
                        ? null
                        : <LineRight
                            backgroundStyle={this.shadeStyle("background")}
                          />}
                </div>
                <div style={this.shadeStyle("color")}
                     className="its-marker-step-name">
                    {name}
                </div>
            </div>
        );
    }


    static handleStepNavClick(step: number) {
        setStep(step);
    }



    private shadeStyle(type: "background" | "color") {
        const { selectedStep, index } = this.props;
        return {
            [type]: selectedStep === index
                ? "#0091EA"
                : selectedStep > index
                    ? "#00C853"
                    : "rgba(33,33,33, 0.5)"
        }
    }
}
