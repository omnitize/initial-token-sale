import * as React from 'react';

interface IProps {
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value?: boolean
    label?: string
}

export class InputCheckbox extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    renderInput() {
        const { name, value, onChange, placeholder } = this.props;

        return  <input
                    name={name}
                    type={"checkbox"}
                    onChange={onChange}
                    checked={value}
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
