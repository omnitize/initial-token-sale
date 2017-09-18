import * as React from 'react';
import { spinnerPath } from '../data/image-data/spinnerPath';

interface ISpinnerProps {
    size: number
}

export const Spinner = (props: ISpinnerProps) =>
    <div className="its-spinner">
        <img
            className="its-spinner__image"
            style={{width: props.size, height: props.size}}
            src={spinnerPath}
            alt={"spinner-loader"}
        />
    </div>;

