import React from 'react'
import classNames from 'classnames';

export interface TabsItemProps {
    label: string;
    className?: string;
    isActive?: boolean;
    disabled?: boolean;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
    const { label, isActive, className, children, disabled } = props
    const classes = classNames('tabs-content', className, {
        'tabs-content-active': isActive,
        'tabs-label-disabled': disabled
    });
    return (
        <div key={label} className={classes}>{children}</div>
    )
}
TabsItem.defaultProps = {
    disabled: false,
    isActive: false
}
export default TabsItem;