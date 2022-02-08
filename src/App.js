import './App.scss';
import Main from './components/main/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react'
import Fiscalia from './components/fiscalia/Fiscalia';
import Side from './components/side/Side';

function App() {
  return (
    <div className="main-app">
      <div className="menu">
        <Side />
      </div>
      <div className="content">
        <BrowserRouter>
          <Switch>
            <Route path="/fiscalias" component={Fiscalia} ></Route>
            <Route path="/" exact component={Main} ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
