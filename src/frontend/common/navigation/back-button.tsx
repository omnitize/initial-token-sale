import * as React from 'react';
import { State } from '../../models';
import { goBackInPage } from '../../state/navigation';

interface IProps {
    state: State;
}

export class BackButton extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const isDisabled = !this.props.state.isHistory;
        return (
            <button
                className={`its-back-button ${isDisabled ? "--disabled" : ""}`}
                onClick={isDisabled ? null : goBackInPage}>
                <div className={`its-back-button__arrow ${isDisabled ? "--disabled" : ""}`}/>
                <span className="its-back-button__text">
                    back
                </span>
            </button>
        );
    }
}
