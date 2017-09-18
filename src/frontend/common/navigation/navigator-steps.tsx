import * as React from 'react';
import { IStep, State } from '../../models';
import { MarkerStep } from './marker-step';
import { maxSteps } from '../../state';

interface INavigatorStepsProps {
    steps: IStep[];
    state: State;
}

export class NavigatorSteps extends React.Component<INavigatorStepsProps, any> {

    divisionSize = 100 / maxSteps();
    stepWidthStyle = {width: `${this.divisionSize}%`};

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { steps, state } = this.props;
        return (
            <div className="its-navigator-steps --its-content-section">
                <div>
                {steps.map((step, i) =>
                    <MarkerStep
                        key={`MarkerStep-${i}`}
                        name={step.name}
                        index={i}
                        selectedStep={state.currentStep}/>
                    )
                }
                </div>
                <div className="its-navigator-steps__inner">
                    <div
                        className="its-navigator-steps__slider --its-transition-transform"
                        style={this.slideTransitionStyle()}>
                        {steps.map((step: IStep, i: number) =>
                            <div key={`step-${i}`}
                                 className="its-navigator-steps__step"
                                 style={this.stepWidthStyle}>
                                {React.cloneElement(
                                    step.component,
                                    {
                                        state: state
                                    }
                                )}
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }

    private slideTransitionStyle() {
        const x = this.props.state.currentStep * this.divisionSize;
        return {
            WebkitTransform: `translateX(${-x}%)`,
            msTransform: `translateX(${-x}%)`,
            transform: `translateX(${-x}%)`
        }
    }
}
