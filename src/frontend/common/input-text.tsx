import * as React from 'react';

interface IProps {
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string
}

export class InputText extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    renderInput() {
        const { name, onChange, placeholder } = this.props;

        return  <input
                    name={name}
                    type={"text"}
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
