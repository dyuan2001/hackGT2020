import React from 'react';
import logo from './logo.svg';
import './App.css';
import title from "./pages/title";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import main from "./pages/main";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={title} />
        <Route exact path="/messenger" component={main}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
