import * as React from 'react';

interface IValidationErrorProps {
    message: string
}

export class ValidationError extends React.Component<IValidationErrorProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <div className={`validation-error-container ${this.props.message.length > 0 ? "--visible" : ""}`}>
                    {this.props.children}
                    <div className="validation-error-text">
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
}
