import * as React from 'react';

interface IProps {}

export class Empty extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
            </div>
        );
    }
}
