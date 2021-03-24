import './App.css';
import React from 'react';
import {
  RecoilRoot
} from 'recoil';

import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoList/>
      </RecoilRoot>
    </div>
  );
}

export default App;
