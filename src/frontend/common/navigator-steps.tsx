import * as React from 'react';
import { IStep, State } from '../models';
import { ButtonStep } from '.';
import { setStep } from '../state';

interface INavigatorStepsProps {
    steps: IStep[];
    state: State;
}

export class NavigatorSteps extends React.Component<INavigatorStepsProps, any> {

    divisionSize = 100 / this.props.steps.length;
    stepWidthStyle = {width: `${this.divisionSize}%`};

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    slideTransitionStyle() {
        return {
            msTransform: `translateX(${-this.props.state.currentStep * this.divisionSize}%)`,
            OTransform: `translateX(${-this.props.state.currentStep * this.divisionSize}%)`,
            MozTransform: `translateX(${-this.props.state.currentStep * this.divisionSize}%)`,
            WebkitTransform: `translateX(${-this.props.state.currentStep * this.divisionSize}%)`,
            transform: `translateX(${-this.props.state.currentStep * this.divisionSize}%)`
        }
    }

    static handleStepNavClick(step: number) {
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
                        selectedStep={this.props.state.currentStep}
                        onClick={() => NavigatorSteps.handleStepNavClick(i)}>
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
                                {React.cloneElement(
                                    step.component,
                                    {
                                        state: this.props.state
                                    }
                                )}
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}
