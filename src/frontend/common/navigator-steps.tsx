import * as React from 'react';
import { IStep } from '../models';
import { isStringifiedEqual } from '../helpers/isStringifiedEqual';
import { ButtonStep } from '.';

interface INavigatorStepsProps {
    steps: IStep[]
}

interface INavigatorStepsState {
    selectedStep: number
}

export class NavigatorSteps extends React.Component<INavigatorStepsProps, INavigatorStepsState> {

    divisionSize = 100 / this.props.steps.length;
    stepWidthStyle = {width: `${this.divisionSize}%`};

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            selectedStep: 0
        };
    }

    componentWillReceiveProps(nextProps: INavigatorStepsProps) {
        if (!isStringifiedEqual(nextProps.steps, this.props.steps)) {
            this.setState({
                selectedStep: 0
            });
        }
    }

    private handleStepNavClick(i: number) {
        this.setState({
            selectedStep: i
        });
    };

    slideTransitionStyle() {
        return {
            msTransform: `translateX(${-this.state.selectedStep * this.divisionSize}%)`,
            OTransform: `translateX(${-this.state.selectedStep * this.divisionSize}%)`,
            MozTransform: `translateX(${-this.state.selectedStep * this.divisionSize}%)`,
            WebkitTransform: `translateX(${-this.state.selectedStep * this.divisionSize}%)`,
            transform: `translateX(${-this.state.selectedStep * this.divisionSize}%)`
        }
    }

    render(): JSX.Element {
        return (
            <div className="its-navigator-steps">
                <div>
                {this.props.steps.map((_, i) =>
                    <ButtonStep
                        key={`step-nav-${i}`}
                        index={i}
                        selectedStep={this.state.selectedStep}
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
