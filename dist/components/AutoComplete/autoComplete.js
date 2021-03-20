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
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    // 输入框值
    , ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    // 输入框值
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    // 下拉框列表
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    // loading状态
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            setLoading(true);
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    // 当输入框发生变化事件
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    // 当点击下拉框item事件
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    // 下拉框
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSuggestions([]); } },
            React.createElement("ul", { className: "lim-suggestion-list" },
                loading &&
                    React.createElement("div", { className: "suggstions-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "lim-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        (suggestions.length > 0) && generateDropdown()));
};
export default AutoComplete;
