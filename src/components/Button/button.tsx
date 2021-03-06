import React from 'react';
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

// 处理按钮事件
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// 处理a链接事件
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// 事件合并 Partial a链接和按钮属性事件都为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

// const Button: React.FC<BaseButtonProps> = (props) => {

const Button: React.FC<ButtonProps> = (props) => {
    const { btnType, className, disabled, size, children, href, ...restProps } = props

    // btn , btn-lg , btn-primary 根据传入的值，判断样式类名
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        // 如果带有link属性并且带有禁用标识
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    // 如果有link并且有href 返回a 链接
    if (btnType === ButtonType.Link && href) {
        return (
            <a
                href={href}
                className={classes}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }

}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;