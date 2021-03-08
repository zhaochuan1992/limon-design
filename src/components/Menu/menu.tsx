import React, { useState, createContext } from 'react';
import classNames from 'classnames'

type SelectCallBack = (selectedIndex: number) => void;

// mode 类型枚举
type MenuMode = 'horizontal' | 'vertical'

// Menu API
export interface MenuProps {
    // 默认选中的下标
    defaultIndex?: number;
    // 样式名
    className?: string;
    // 纵向/横向类型
    mode?: MenuMode;
    // 样式
    style?: React.CSSProperties;
    // 选中事件
    onSelect?: SelectCallBack;
}

// 向子组件传值类型约定
interface IMenuContest {
    index: number;
    onSelect?: SelectCallBack;
}
// 全局属性方便menuitem调用
export const MenuContext = createContext<IMenuContest>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {

    const { className, mode, style, children, defaultIndex, onSelect } = props

    // 用于切换选中的item
    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('lim-menu', className, {
        'menu-vertical': mode === 'vertical'
    })
    // 用户触发的事件
    const handleClick = (index: number) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passenContext: IMenuContest = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passenContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )

}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu