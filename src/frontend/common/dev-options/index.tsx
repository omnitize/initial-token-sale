import * as React from 'react';
import { UseCaseToggle, DarkThemeToggle } from './options';
import { State } from '../../models';

interface IProps {
    state: State
}

export class DevOptions extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <UseCaseToggle
                    state={this.props.state}/>
                <DarkThemeToggle
                    state={this.props.state}/>
            </div>
        );
    }
}
