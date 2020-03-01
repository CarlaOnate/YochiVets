import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import Navbar from './components/Navbar'
import Auth from './components/Auth';
import Profile from './components/Profile'
import FindVets from './components/FindVets'
import SignupVet from './components/SignupVet.js'
import MakeAppointment from './components/MakeAppointment';

const Router = () => (
  <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Auth}/>
      <Route exact path="/findVets" component={FindVets}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/register-vet" component={SignupVet}/>
      <Route exact path="/make-appointment/:id" component={MakeAppointment}/>
      <Route component={NotFound} />
    </Switch>
  </>
)

export default Router;
