import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart/Cart';

ReactDOM.render(
  <HashRouter >
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/products/:id" component={Cart}/>
    </Switch>
  </HashRouter>,
document.getElementById('root'));