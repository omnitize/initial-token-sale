import * as React from 'react';
import {ChangeEvent} from 'react';

interface IProps {
    name: string
    type: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string
}

interface IState {}

export class Input extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    renderInput() {
        const { name, type, onChange, placeholder } = this.props;

        return  <input
                    name={name}
                    type={type}
                    onChange={onChange}
                    placeholder={!!placeholder ? placeholder : null}
                />
    }

    render(): JSX.Element {
        return (
            !!this.props.label
                ?   <label htmlFor={this.props.name}>
                        {this.props.label}
                        {this.renderInput()}
                    </label>
                :   this.renderInput()

        );
    }
}
