import * as React from 'react';
import { IShadeStyle } from '../../../models';

interface ILineLeftProps {
    backgroundStyle: IShadeStyle
}

export const LineLeft = (props: ILineLeftProps) => {
    return (
        <div style={props.backgroundStyle}
             className="its-line-left"/>
    );
};
