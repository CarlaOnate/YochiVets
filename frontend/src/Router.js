import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import Navbar from './components/Navbar'
import Auth from './components/Auth';
import FindVets from './components/FindVets';

const Router = () => (
  <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/client/signup" component={Auth}/>
      <Route exact path="/findVets" component={FindVets}/>
      <Route component={NotFound} />
    </Switch>
  </>
)

export default Router;
