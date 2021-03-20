import React, { useState } from 'react';
import classnames from 'classnames';
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
var Alert = function (props) {
    var _a;
    var title = props.title, closable = props.closable, type = props.type, customClose = props.customClose, onClose = props.onClose, children = props.children;
    var customCloseP = customClose || React.createElement(Icon, { icon: "times", className: "window-close", size: 'lg' });
    var classes = classnames('alert', (_a = {},
        _a["alert-" + type] = type,
        _a));
    var handleClick = function () {
        setVisible(false);
        if (onClose) {
            onClose();
        }
    };
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    return (React.createElement(Transition, { in: visible, animation: "zoom-in-left", timeout: 300, wrapper: true },
        React.createElement("div", { className: classes },
            title ? React.createElement("h4", { className: "alert-title" }, title) : null,
            React.createElement("p", { className: "alert-message" }, children),
            closable ? React.createElement("i", { onClick: handleClick }, customCloseP) : null)));
};
Alert.defaultProps = {
    type: "primary"
};
export default Alert;
