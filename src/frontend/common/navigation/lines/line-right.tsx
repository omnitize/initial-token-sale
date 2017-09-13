import * as React from 'react';
import { IShadeStyle } from '../../../models';

interface IProps {
    backgroundStyle: IShadeStyle
}

export class LineRight extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div style={this.props.backgroundStyle}
                 className="its-line-right"/>
        );
    }
}
