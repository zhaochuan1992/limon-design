import React, { useState, createContext } from 'react';
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type SelectCallBack = (selectedIndex: string) => void;

// mode 类型枚举
type MenuMode = 'horizontal' | 'vertical'

// Menu API
export interface MenuProps {
    // 默认选中的下标
    defaultIndex?: string;
    // 样式名
    className?: string;
    // 纵向/横向类型
    mode?: MenuMode;
    // 样式
    style?: React.CSSProperties;
    // 选中事件
    onSelect?: SelectCallBack;
    // 纵向模式默认展开
    defaultOpenSubMenus?: string[];
}

// 向子组件传值类型约定
interface IMenuContest {
    index: string;
    onSelect?: SelectCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
// 全局属性方便menuitem调用
export const MenuContext = createContext<IMenuContest>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {

    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props

    // 用于切换选中的item
    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('lim-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })
    // 用户触发的事件
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passenContext: IMenuContest = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passenContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )

}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu