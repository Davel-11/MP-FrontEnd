import './App.scss';
import Main from './components/main/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react'

function App() {
  return (
    <div className="main-app">
      <BrowserRouter>
        <Switch>
          {/* <Route path="/fiscalias" component={Student} ></Route> */}
          <Route path="/" exact component={Main} ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
