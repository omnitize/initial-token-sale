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
            transform: `translateX(${-this.state.selectedStep * 100}vw)`,
            width: "300vw",
            transition: "transform 200ms"
        };
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
                <div style={ slideTransition }>
                    {this.props.steps.map((step: IStep, i: number) =>
                        <div key={`step-${i}`}
                             style={{display: "inline-block", width: "100vw", height: "80vh"}}>
                            {step.component}
                        </div>)}
                </div>
            </div>
        );
    }
}
