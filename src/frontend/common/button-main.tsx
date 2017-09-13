import * as React from 'react';

interface IButtonMainProps {
    onClick: () => void
    isSelected?: boolean
    isDisabled?: boolean
}

export class ButtonMain extends React.Component<IButtonMainProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { children, onClick, isSelected, isDisabled } = this.props;
        return (
            <button
                className={`its-button-main ${isSelected ? "--selected" : ""} ${isDisabled ? "--disabled" : ""}`}
                onClick={onClick}>
                <span className="its-button-main__content">
                    {children}
                </span>
            </button>
        );
    }
}
