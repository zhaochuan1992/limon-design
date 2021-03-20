var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props
    // btn , btn-lg , btn-primary 根据传入的值，判断样式类名
    , ["btnType", "className", "disabled", "size", "children", "href"]);
    // btn , btn-lg , btn-primary 根据传入的值，判断样式类名
    var classes = classNames('lim-btn', className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        // 如果带有link属性并且带有禁用标识
        _a['disabled'] = (btnType === 'link') && disabled,
        _a));
    // 如果有link并且有href 返回a 链接
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ href: href, className: classes }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};
export default Button;
