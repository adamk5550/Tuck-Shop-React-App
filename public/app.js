import React, { Component } from 'react'
import ReactDom from 'react-dom'
import QrReader from 'react-qr-reader'
import AlertContainer from 'react-alert'
import axios from 'axios'
import Header from './Header'
import Scan from './Scan'
import Dashboard from './Dashboard'
import { Router, Route, Link, browserHistory } from 'react-router'

var store = {}

class Container extends React.Component{
  render(){
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    )
  }
}

class Login extends React.Component{
    storeToken(data){
    window.localStorage.setItem('token', data.token);
  }
  login(e){
    e.preventDefault();
    axios.post('http://tuckshop.allan.cx/api/v1/authenticate',
      {
        'email': ReactDom.findDOMNode(this.refs.email).value,
        'password': ReactDom.findDOMNode(this.refs.password).value
      })
      .then((response) => {
        this.storeToken(response.data)
        this.context.history.replaceState(null, '/dashboard')
      })
      .catch((response) => console.log('error'+response))
  }
  render(){
    return (
      <div className="flex-center-align login">
        <section>
          <h2>Sign In</h2>
          <form ref="form" onSubmit={this.login.bind(this)}>
            <input name="email" ref="email" placeholder="Email" type="text" /><br/>

            <input name="password" ref="password" placeholder="Password" type="password" /><br/>
            <input value="Sign In" type="submit" />
          </form>
        </section>
      </div>
    )
  }
}

Login.contextTypes = {
  history: React.PropTypes.object
}


var redirect = (nextState, replace) => {
  let token = window.localStorage.getItem('token');
  if(token !== null){
    replace('/dashboard');
  }else{
    return true
  }
}

var auth = (nextState, replace) => {
  let token = window.localStorage.getItem('token');
  if(token === null){
    replace('/');
  }else{
    return true
  }
}


let routes = {
  path: '/',
  component: Container,
  indexRoute: { component: Login, onEnter:redirect  },
  childRoutes: [
    { path: 'dashboard', component: Dashboard, onEnter: auth},
    { path: 'scan', component: Scan, onEnter: auth}
  ]
};


ReactDom.render(<Router routes={routes} history={browserHistory}/>, document.getElementById('react-app'));
