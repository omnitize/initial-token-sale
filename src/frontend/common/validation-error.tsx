import * as React from 'react';

export class ValidationError extends React.Component<any, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div className="validation-error">
                <p>
                    {this.props.children}
                </p>
            </div>
        );
    }
}
