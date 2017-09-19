import * as React from 'react';

interface ILineRightProps {
    stepClass: string
}

export const LineRight = (props: ILineRightProps) => {
    return (
        <div className={`its-line-right ${props.stepClass}`}/>
    );
};
