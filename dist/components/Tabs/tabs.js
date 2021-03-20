import React, { useState } from 'react';
import classNames from 'classnames';
var Tabs = function (props) {
    var className = props.className, styleType = props.styleType, defaultIndex = props.defaultIndex, children = props.children, onSelect = props.onSelect;
    var classes = classNames('tabs-nav', className, {
        'tabs-underline': styleType === "underline",
        'tabs-outline': styleType === "outline"
    });
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (index, disabled) {
        if (disabled) {
            return;
        }
        setActiveIndex(index);
        if (typeof onSelect === 'function') {
            onSelect(index);
        }
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var itemLabelClasses = classNames('tabs-label', {
                'tabs-label-active': activeIndex === index,
                'tabs-label-disabled': childElement.props.disabled
            });
            return (React.createElement("li", { key: index, className: itemLabelClasses, onClick: function () { return handleClick(index, childElement.props.disabled || false); } }, childElement.props.label));
        });
    };
    return (React.createElement("div", null,
        React.createElement("nav", { className: classes },
            React.createElement("ul", { className: "tabs-ul" }, renderChildren())),
        React.Children.map(children, function (child, index) {
            var childElement = child;
            return React.cloneElement(childElement, { isActive: activeIndex === index });
        })));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    styleType: 'underline',
};
export default Tabs;
