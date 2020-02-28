import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './componentes/Login'
import Home from './componentes/Home'

export default class Routes extends Component {
  render() {
      // sempre vai ficar assim, receita de bolo
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home/:usuario" component={Home}/>
            </Switch>
        </BrowserRouter>)
    
        
  }
}
