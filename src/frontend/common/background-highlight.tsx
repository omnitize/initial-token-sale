import * as React from 'react';

export class BackgroundHighlight extends React.Component<any, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div className="background-highlight">
                {this.props.children}
            </div>
        );
    }
}
