import React, { Component } from 'react'
import ReactDom from 'react-dom'
import QrReader from 'react-qr-reader'
import axios from 'axios'
import login from './Login'
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

class Checkout extends React.Component{
  render(){
    this.store = store;
    return (
      <div>cat
        {/* {Object.keys(this.store.items).map((i) => {
          return (<li id={i}>{this.store.items[i].name + ' £'+this.store.items[i].price}</li>)
        })} */}
      </div>
    )
  }
}

Checkout.contextTypes = {
  result: React.PropTypes.object
}

class Scan extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: '',
    }
  }
  handleScan(data){
    this.setState({
      result: data,
    })
    store = data;
    console.log(store);

    let alert = confirm('Ordered Successfully');
    if(alert == true) {
      browserHistory.push('/checkout')
    }

    // axios.post('', data)
    //   .then(function(response){
    //     console.log('Ordered Successfully')
    //     browserHistory.push('checkout');
    //   }).catch((response) => console.log('error'+response));

  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 600,
      width: 600,
    }

    return(
      <div className="wrapper">
        <QrReader
          className="QR"
          previewStyle={previewStyle}
          handleError={this.handleError}
          handleScan={this.handleScan.bind(this)}/>
        <p>{this.state.result}</p>
      </div>
    )
  }
}

Scan.contextTypes = {
  result: React.PropTypes.object,
  history: React.PropTypes.object

}

class Header extends React.Component{
  render(){
    return (
      <header className="bar-header">
      <div className="button-box"></div>
        <h2>Tuck Shop </h2>
        <div className="button-box">
          <Link className="btn" to="/scan">Scan</Link>
        </div>
      </header>
    )
  }
}

class Dashboard extends React.Component{
  constructor(){
    super()
    this.state = {
      transactions: [],
      account: []
    }
  }
  componentDidMount(){

    axios.defaults.headers.common['Authorization'] = 'Bearer '+window.localStorage.getItem('token');
    axios.get('https://tuckshop.allan.cx/api/v1/account')
      .then((response) => {
        var account = response.data.account;
        this.setState({
          transactions: response.data.transactions,
          account: account
        });
        console.log(this.state)
      })
      .catch((response) => console.log('error'+response))
  }
  render(){
    return (
      <div className="container">
        <Header />
          <section className="panel">
            <h2>Account</h2>

            <span>{this.state.account.name} </span>
            <img src={this.state.account.grav} />
          </section>
          <section className="panel">
            <h2>Transactions</h2>
            <ul>
            {this.state.transactions.map((item) => {
              var i = 0;
              return (
                <li key={item.id}>£{item.amount}</li>
              )
            })}
            </ul>
          </section>
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
    { path: 'checkout', component: Checkout, onEnter: auth},
    { path: 'scan', component: Scan, onEnter: auth}
  ]
};


ReactDom.render(<Router routes={routes} history={browserHistory}/>, document.getElementById('react-app'));
