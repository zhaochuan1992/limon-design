import React from 'react';
export interface TabsItemProps {
    label: string;
    className?: string;
    isActive?: boolean;
    disabled?: boolean;
}
declare const TabsItem: React.FC<TabsItemProps>;
export default TabsItem;
