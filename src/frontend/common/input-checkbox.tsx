import * as React from 'react';

interface IInputCheckboxProps {
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value: boolean
    paragraph?: string
}

export class InputCheckbox extends React.Component<IInputCheckboxProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { name, value, paragraph, placeholder } = this.props;

        return (
            <div className="its-input-checkbox">
                <input
                    className="its-input-checkbox__input"
                    id="its-input-checkbox__input"
                    name={name}
                    type={"checkbox"}
                    onChange={this.handleChange}
                    checked={value}
                    placeholder={!!placeholder ? placeholder : null}
                />
                <label
                    className="its-input-checkbox__label"
                    htmlFor={"its-input-checkbox__input"}>
                </label>
                <div className="its-input-checkbox__paragraph">
                    {!!paragraph ? <p>{paragraph}</p> : null}
                </div>
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("InputCheckbox.handleChange: " + e.currentTarget.checked);
        this.props.onChange(e);
    }
}
