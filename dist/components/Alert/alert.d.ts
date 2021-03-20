import React from 'react';
export declare type AlertType = 'primary' | 'warning' | 'success' | 'link';
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
declare const Alert: React.FC<IAlertProps>;
export default Alert;
