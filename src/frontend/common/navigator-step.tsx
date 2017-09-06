import * as React from 'react';
import { IStep } from '../models';
import { isStringifiedEqual } from '../helpers/isStringifiedEqual';
import { ButtonStep } from '.';

interface INavigatorStepProps {
    steps: IStep[]
}

interface INavigatorStepState {
    selectedStep: number
}

export class NavigatorStep extends React.Component<INavigatorStepProps, INavigatorStepState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            selectedStep: 0
        };
    }

    componentWillReceiveProps(nextProps: INavigatorStepProps) {
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
            <div className="its-navigator-step">
                <div>
                {this.props.steps.map((_, i) =>
                    <ButtonStep
                        key={`step-nav-${i}`}
                        index={i}
                        onClick={() => this.handleStepNavClick(i)}>
                        {`${i + 1}`}
                    </ButtonStep>
                    )
                }
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
