import './App.css';
import React from 'react';
import {
  RecoilRoot
} from 'recoil';

import CurrentUserInfo from './components/CurrentUserInfo/CurrentUserInfo'

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <CurrentUserInfo/>
      </RecoilRoot>
    </div>
  );
}

export default App;
