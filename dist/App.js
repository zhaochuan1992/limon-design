import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import Upload from './components/Upload/upload';
import Progress from './components/Progress/progress';
function App() {
    var fetchSuggestions = function () {
        return [{ value: 'dan' }, { value: 'jerry' }, { value: 'henry' }];
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Menu, { mode: 'horizontal', defaultOpenSubMenus: ['5'], defaultIndex: '0', onSelect: function (index) { return console.log(index); } },
                React.createElement(MenuItem, null, "link1"),
                React.createElement(MenuItem, { disabled: true }, "link2"),
                React.createElement(MenuItem, null, "link3"),
                React.createElement(MenuItem, null, "link4"),
                React.createElement(MenuItem, null, "link5"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "cool link1"),
                    React.createElement(MenuItem, null, "cool link2"),
                    React.createElement(MenuItem, null, "cool link3"))),
            React.createElement(Button, { disabled: true }, " hello "),
            React.createElement(Button, { onClick: function (e) { alert('ddd'); } }, " hello "),
            React.createElement(Button, { btnType: 'primary', size: 'lg' }, " hellodd "),
            React.createElement(Button, { btnType: 'danger', size: 'sm' }, " hello "),
            React.createElement(Progress, { percent: 15 }),
            React.createElement(Tabs, { styleType: 'outline' },
                React.createElement(TabsItem, { label: 'wdawd1' }, "wdwad"),
                React.createElement(TabsItem, { label: 'wdawd2', disabled: true }, "refregerg"),
                React.createElement(TabsItem, { label: 'wdawd3' }, "regerg")),
            React.createElement(Input, null),
            React.createElement(AutoComplete, { fetchSuggestions: fetchSuggestions, onSelect: function (item) { return console.log(item); } }),
            React.createElement(Upload, { action: "http://api-mock/api/upload", multiple: true, drag: true }))));
}
export default App;
