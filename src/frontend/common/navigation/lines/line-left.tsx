import * as React from 'react';

interface ILineLeftProps {
    stepClass: string
}

export const LineLeft = (props: ILineLeftProps) => {
    return (
        <div className={`its-line-left ${props.stepClass}`}/>
    );
};
