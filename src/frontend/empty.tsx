import * as React from 'react';

interface IProps {}

interface IState {}

export class Empty extends React.Component<IProps, IState> {

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
