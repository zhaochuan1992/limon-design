import React from 'react';
declare type TabStyle = "underline" | "outline";
export interface TabProps {
    defaultIndex?: number;
    styleType?: TabStyle;
    onSelect?: (selectedIndex: number) => void;
    className?: string;
}
declare const Tabs: React.FC<TabProps>;
export default Tabs;
