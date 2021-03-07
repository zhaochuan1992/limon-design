import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled> hello </Button>
        <Button onClick={(e) => { alert('ddd') }}> hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hellodd </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}> hello </Button>

        <Alert title={'dddaa'} type={AlertType.Danger} />
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
