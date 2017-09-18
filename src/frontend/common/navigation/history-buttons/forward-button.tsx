import * as React from 'react';
import { State } from '../../../models';
import { goForwardInPage } from '../../../state';

interface IProps {
    state: State;
}

export class ForwardButton extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const isDisabled = !this.props.state.isBackHistory;
        return (
            <button
                className={`its-forward-button ${isDisabled ? "--disabled" : ""}`}
                onClick={isDisabled ? null : goForwardInPage}>
                <div className={`its-forward-button__arrow ${isDisabled ? "--disabled" : ""}`}/>
                <span className="its-forward-button__text">
                    forward
                </span>
            </button>
        );
    }
}
