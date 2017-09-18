import * as React from 'react';
import { IShadeStyle } from '../../../models';

interface ILineRightProps {
    backgroundStyle: IShadeStyle
}

export const LineRight = (props: ILineRightProps) => {
    return (
        <div style={props.backgroundStyle}
             className="its-line-right"/>
    );
};
