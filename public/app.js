import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import { Router, Route, Link, browserHistory } from 'react-router'

var store = {}

class Scan extends React.Component{
  constructor(){
    super()
    this.state = {
      cart: ''
    };
  }
  captureImage(image){

      this.state.context.drawImage(this.state.video, 0, 0, 500, 400);

      qrcode.decode(this.state.canvas.toDataURL());
      qrcode.callback = (data) => {
        if(data !== "error decoding QR Code"){
          var converted = JSON.parse(data);
          this.setState({ cart: converted })
          store = converted;
          this.context.history.replaceState('null', 'checkout')
        }
      };

  }
  componentDidMount(){
    this.setState({
      video: ReactDom.findDOMNode(this.refs.video),
      canvas : ReactDom.findDOMNode(this.refs.canvas),
      context:  ReactDom.findDOMNode(this.refs.canvas).getContext('2d'),
    })
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      (stream) => {
        let vendorURL = window.URL || window.webkitURL;
        this.state.video.src = vendorURL.createObjectURL(stream);
        this.state.video.play();
      },
      (err) => {
        console.log("cart empty");
      }
    );
  }
  render(){
    return (
      <div className="wrapper">
        <video ref="video" height="100%" width="100%">Video stream not available.</video>
        <button className="capture-btn btn" onClick={this.captureImage.bind(this)}><i className="fa fa-camera"></i></button>
        <canvas style={{display:"none"}}  ref="canvas" height="600px" width="600px"></canvas>
      </div>
    )
  }
}


Scan.contextTypes = {
  cart: React.PropTypes.object,
  history: React.PropTypes.object
}

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
      <div>
        {Object.keys(this.store.items).map((i) => {
          return (<li id={i}>{this.store.items[i].name + ' £'+this.store.items[i].price}</li>)
        })}
      </div>
    )
  }
}

Checkout.contextTypes = {
  cart: React.PropTypes.object,
  history: React.PropTypes.object
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
      <div className="flex-center-align">
        <section className="panel">
          <h2>Sign In</h2>
          <form ref="form" onSubmit={this.login.bind(this)}>
            <label >Email</label>
            <input name="email" ref="email" type="text" /><br/>

            <label >Password</label>
            <input name="password" ref="password" type="password" /><br/>
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

class Header extends React.Component{
  render(){
    return (
      <header className="bar-header">
        <div className="button-box"></div>
        <h2>IFM </h2>
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
    console.log('hello')
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

var redirect = (nextState, replaceState) => {
  let token = window.localStorage.getItem('token');
  if(token !== null){
    replaceState(null, '/dashboard');
  }else{
    return true
  }
}

var auth = (nextState, replaceState) => {
  let token = window.localStorage.getItem('token');
  if(token === null){
    replaceState(null, '/');
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
    { path: 'scan', component: Scan, onEnter: auth},
    { path: 'checkout', component: Checkout, onEnter: auth},
  ]
};


ReactDom.render(<Router routes={routes} />, document.getElementById('react-app'));
