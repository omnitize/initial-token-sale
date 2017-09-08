import * as React from 'react';

interface IInputTextProps {
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder?: string
    label?: string
}

export class InputText extends React.Component<IInputTextProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    renderInput() {
        const { name, value, onChange, placeholder } = this.props;

        return  <input
                    name={name}
                    type={"text"}
                    value={value}
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
