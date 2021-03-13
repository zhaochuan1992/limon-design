import React, { useState } from 'react';
import classnames from 'classnames';
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";

// Alert类型枚举
export enum AlertType {
    Success = 'success',
    Primary = 'primary',
    Warning = 'warning',
    Danger = 'danger'
}

export interface IAlertProps {
    /**
     * the title
     */
    title?: string;
    /**
     * whether this alert can close.
     */
    closable?: boolean;
    /**
     * the close icon
     */
    customClose?: string;
    /**
     * onClose action
     */
    onClose?: (() => void);
    /**
     * the description of this alert
     */
    children?: React.ReactNode;
    /**
     * alert type
     */
    type: AlertType;
}

const Alert: React.FC<IAlertProps> = (props) => {
    const { title, closable, type, customClose, onClose, children } = props

    const customCloseP = customClose || <Icon icon="times" className="window-close" size='lg' />

    const classes = classnames('alert', {
        [`alert-${type}`]: type
    });

    const handleClick = () => {
        setVisible(false);
        if (onClose) {
            onClose();
        }
    }

    const [visible, setVisible] = useState(true);
    return (
        <Transition in={visible} animation="zoom-in-left" timeout={300} wrapper={true}>
            <div className={classes}>
                {title ? <h4 className="alert-title">{title}</h4> : null}
                <p className="alert-message">{children}</p>
                {closable ? <i onClick={handleClick}>{customCloseP}</i> : null}
            </div>
        </Transition>
    );
}

Alert.defaultProps = {
    type: AlertType.Primary
}

export default Alert