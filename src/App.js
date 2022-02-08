import './App.scss';
import Main from './components/main/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react'
import Fiscalia from './components/fiscalia/Fiscalia';
import Side from './components/side/Side';
import Reportes from './components/reportes/Reportes';

function App() {

  return (
    <div className="main-app">
      <BrowserRouter>
      <div className="menu">
        <Side />
      </div>
      <div className="content">
          <Switch>
            <Route path="/fiscalias" component={Fiscalia} ></Route>
            <Route path="/reportes" component={Reportes} ></Route>
            <Route path="/" exact component={Main} ></Route>
          </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
