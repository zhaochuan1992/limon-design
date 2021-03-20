import React from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
