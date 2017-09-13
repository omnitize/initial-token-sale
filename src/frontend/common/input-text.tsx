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

    render(): JSX.Element {
        const { name, label } = this.props;

        return (
            <label
                className="its-input-text__label"
                htmlFor={name}>
                {label}
                {this.renderInput()}
            </label>
        );
    }

    private renderInput() {
        const { name, value, onChange, placeholder } = this.props;

        return  <input
            className="its-input-text"
            name={name}
            type={"text"}
            value={value}
            onChange={onChange}
            placeholder={!!placeholder ? placeholder : null}
        />
    }
}
