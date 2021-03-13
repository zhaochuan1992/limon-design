import React from 'react';
// import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from "./components/Icon/icon";
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';


function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Menu mode={'horizontal'} defaultOpenSubMenus={['5']} defaultIndex='0' onSelect={index => console.log(index)}>
          <MenuItem>link1</MenuItem>
          <MenuItem disabled>link2</MenuItem>
          <MenuItem>link3</MenuItem>
          <MenuItem>link4</MenuItem>
          <MenuItem>link5</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>cool link1</MenuItem>
            <MenuItem>cool link2</MenuItem>
            <MenuItem>cool link3</MenuItem>
          </SubMenu>
        </Menu>

        {/* <Button disabled> hello </Button>
        <Button onClick={(e) => { alert('ddd') }}> hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hellodd </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}> hello </Button> */}

        <Alert title={'dddaa'} type={AlertType.Primary} closable />

        <Tabs styleType='outline'>
          <TabsItem label='wdawd1'>wdwad</TabsItem>
          <TabsItem label='wdawd2' disabled>refregerg</TabsItem>
          <TabsItem label='wdawd3'>regerg</TabsItem>
        </Tabs>

        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

      </header>
    </div>
  );
}

export default App;
