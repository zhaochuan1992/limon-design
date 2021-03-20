import { FC } from 'react'
import Tabs, { TabProps } from './tabs'
import TabsItem, { TabsItemProps } from './tabsItem'

export type ITabsComponent = FC<TabProps> & {
    Item: FC<TabsItemProps>,
}
const TransTab = Tabs as ITabsComponent

TransTab.Item = TabsItem

export default TransTab