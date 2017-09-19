import * as React from 'react';
import { ButtonMain } from '../..';
import { State } from '../../../models';
import { setNextState } from '../../../state/index';

interface IDarkThemeToggleProps {
    state: State
}

export class DarkThemeToggle extends React.Component<IDarkThemeToggleProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <ButtonMain
                    onClick={this.toggleDarkTheme}>
                    Toggle Dark Theme
                </ButtonMain>
            </div>
        );
    }

    private toggleDarkTheme = () => {
        setNextState({
            isDarkTheme: !this.props.state.isDarkTheme
        });
    };

}
