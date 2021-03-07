import React from 'react';
import classNames from 'classnames'

// 提示框类型枚举
export enum AlertType {
    Primary = "success",
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}
// 提示框props传入数据接口
interface BaseAlertProps {
    title: string;
    description?: string;
    className?: string;
    closable?: boolean;
    type?: AlertType;
    children?: React.ReactNode;
}

// // 处理按钮事件
// type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// // 处理a链接事件
// type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// // 事件合并 Partial a链接和按钮属性事件都为可选
// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Alert: React.FC<BaseAlertProps> = (props) => {
    const { title, className, type, closable, description, children, ...restProps } = props

    const classes = classNames('alert', className, {
        [`alert-${type}`]: type,
    })

    return (
        <div className={classes} {...restProps}>
            <span >
                {title}
            </span>
        </div>
    )

}

Alert.defaultProps = {
    closable: false,
    type: AlertType.Default
}

export default Alert;