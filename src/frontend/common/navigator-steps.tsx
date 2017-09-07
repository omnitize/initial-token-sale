import * as React from 'react';
import { IStep } from '../models';
import { ButtonStep } from '.';
import { setStep } from '../state';

interface INavigatorStepsProps {
    steps: IStep[];
    currentStep: number;
}

interface INavigatorStepsState {
}

export class NavigatorSteps extends React.Component<INavigatorStepsProps, INavigatorStepsState> {

    divisionSize = 100 / this.props.steps.length;
    stepWidthStyle = {width: `${this.divisionSize}%`};

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    slideTransitionStyle() {
        return {
            msTransform: `translateX(${-this.props.currentStep * this.divisionSize}%)`,
            OTransform: `translateX(${-this.props.currentStep * this.divisionSize}%)`,
            MozTransform: `translateX(${-this.props.currentStep * this.divisionSize}%)`,
            WebkitTransform: `translateX(${-this.props.currentStep * this.divisionSize}%)`,
            transform: `translateX(${-this.props.currentStep * this.divisionSize}%)`
        }
    }

    handleStepNavClick(step: number) {
        setStep(step);
    }

    render(): JSX.Element {
        return (
            <div className="its-navigator-steps">
                <div>
                {this.props.steps.map((_, i) =>
                    <ButtonStep
                        key={`step-nav-${i}`}
                        index={i}
                        selectedStep={this.props.currentStep}
                        onClick={() => this.handleStepNavClick(i)}>
                        {`${i + 1}`}
                    </ButtonStep>
                    )
                }
                </div>
                <div className="its-navigator-steps__inner">
                    <div
                        className="its-navigator-steps__slider"
                        style={this.slideTransitionStyle()}>
                        {this.props.steps.map((step: IStep, i: number) =>
                            <div key={`step-${i}`}
                                 className="its-navigator-steps__step"
                                 style={this.stepWidthStyle}>
                                {step.component}
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}
