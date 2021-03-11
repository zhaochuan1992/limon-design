import React, { useState } from 'react'
import classNames from 'classnames';
import { TabsItemProps } from "./tabsItem";

type TabStyle = "underline" | "outline";

export interface TabProps {
    defaultIndex?: number;
    styleType?: TabStyle;
    onSelect?: (selectedIndex: number) => void;
    className?: string;
}

const Tabs: React.FC<TabProps> = (props) => {
    const { className, styleType, defaultIndex, children, onSelect } = props

    const classes = classNames('tabs-nav', className, {
        'tabs-underline': styleType === "underline",
        'tabs-outline': styleType === "outline"
    });
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    const handleClick = (index: number, disabled: boolean) => {
        if (disabled) {
            return;
        }
        setActiveIndex(index);
        if (typeof onSelect === 'function') {
            onSelect(index);
        }
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>;
            const itemLabelClasses = classNames('tabs-label', {
                'tabs-label-active': activeIndex === index,
                'tabs-label-disabled': childElement.props.disabled
            });
            return (
                <li
                    key={index}
                    className={itemLabelClasses}
                    onClick={() => handleClick(index, childElement.props.disabled || false)}
                >
                    {childElement.props.label}
                </li>
            )
        })
    }

    return (
        <div>
            <nav className={classes}>
                <ul className="tabs-ul">
                    {renderChildren()}
                </ul>
            </nav>
            {React.Children.map(children, (child, index) => {
                const childElement = child as React.FunctionComponentElement<TabsItemProps>;
                return React.cloneElement(childElement, { isActive: activeIndex === index });
            })}
        </div>
    )

}

Tabs.defaultProps = {
    defaultIndex: 0,
    styleType: 'underline',
}

export default Tabs