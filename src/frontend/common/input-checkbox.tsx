import * as React from 'react';

interface IInputCheckboxProps {
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value?: boolean
    paragraph?: string
}

export class InputCheckbox extends React.Component<IInputCheckboxProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    renderInput() {
        const { name, onChange, placeholder } = this.props;

        return  <input
                    className="its-input-checkbox__input"
                    name={name}
                    type={"checkbox"}
                    onChange={onChange}
                    checked={true}
                    placeholder={!!placeholder ? placeholder : null}
                />
    }

    render(): JSX.Element {
        return (
            <div className="its-input-checkbox">
                {this.renderInput()}
                <label
                    className="its-input-checkbox__label"
                    htmlFor={this.props.name}>
                </label>
                <div className="its-input-checkbox__paragraph">
                    {!!this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                </div>
            </div>
        );
    }
}
