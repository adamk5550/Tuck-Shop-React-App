import React from 'react';
import { IndexRoute , Router, Route } from 'react-router';

import App from './components/App/App';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login';
import Scanner from './components/Scanner/Scan';
import NotFound from './components/NotFound/NotFound';

const redirect = (nextState, replace) => {
  let token = window.localStorage.getItem('token');
  if(token !== null){
    replace('/dashboard');
  }else{
    return true
  }
}

const requireAuth = (nextState, replace) => {
  let token = window.localStorage.getItem('token');
  if(token === null){
    replace('/');
  }else{
    return true
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} onEnter={redirect} />
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="/scan" component={Scanner} onEnter={requireAuth} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export default Routes;
