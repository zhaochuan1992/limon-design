import { FC } from 'react';
import { TabProps } from './tabs';
import { TabsItemProps } from './tabsItem';
export declare type ITabsComponent = FC<TabProps> & {
    Item: FC<TabsItemProps>;
};
declare const TransTab: ITabsComponent;
export default TransTab;
