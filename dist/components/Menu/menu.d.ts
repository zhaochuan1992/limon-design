import React from 'react';
declare type SelectCallBack = (selectedIndex: string) => void;
declare type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallBack;
    defaultOpenSubMenus?: string[];
}
interface IMenuContest {
    index: string;
    onSelect?: SelectCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContest>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
