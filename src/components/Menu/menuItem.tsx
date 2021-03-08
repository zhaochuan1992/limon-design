import React, { useContext } from 'react';
import classNames from 'classnames'
import { MenuContext } from './menu'


// 子menu API
export interface MenuItemProps {
    // 选中下标
    index: number;
    // 是否禁选
    disabled?: boolean;
    // 样式名
    className?: string;
    // 样式
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props

    const context = useContext(MenuContext)

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-avtive': context.index === index
    })

    const handleClick = () => {
        if (context.onSelect && !disabled) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default MenuItem