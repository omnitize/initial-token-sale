import * as React from 'react';
import {IStep} from '../models';
import {isStringifiedEqual} from '../helpers/isStringifiedEqual';

interface IStepNavigatorProps {
    steps: IStep[]
}

interface IStepNavigatorState {
    selectedStep: number
}

export class StepNavigator extends React.Component<IStepNavigatorProps, IStepNavigatorState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            selectedStep: 0
        };
    }

    componentWillReceiveProps(nextProps: IStepNavigatorProps) {
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

    render(): JSX.Element {
        const slideTransition = {
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
            transform: `translateX(${-this.state.selectedStep * 100 / 3}%)`,
            width: "300%",
            transition: "transform 200ms"
        } as any;
        return (
            <div>
                <div>
                {this.props.steps.map((_, i) =>
                    <button
                        key={`step-nav-${i}`}
                        onClick={() => this.handleStepNavClick(i)}>
                        {`${i + 1}`}
                    </button>)}
                </div>
                <div>{this.props.steps[this.state.selectedStep].name}</div>
                <div style={{position: "relative", width: "100%", minHeight: 768, overflow: "hidden"}}>
                    <div style={ slideTransition }>
                        {this.props.steps.map((step: IStep, i: number) =>
                            <div key={`step-${i}`}
                                 style={{display: "inline-block", width: `${100 / 3}%`}}>
                                {step.component}
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}
