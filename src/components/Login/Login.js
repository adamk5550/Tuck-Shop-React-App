import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import auth from '../../auth'

import './Login.css';

class Login extends Component{
  constructor(){
    super()
    this.state = {
      error: false
    }
  }

  login(e){
    e.preventDefault();
    axios.post('http://tuckshop.allan.cx/api/v1/authenticate',
      {
        'email': ReactDom.findDOMNode(this.refs.email).value,
        'password': ReactDom.findDOMNode(this.refs.password).value
      })
      .then((response) => {
        auth.storeToken(response.data);
        this.context.router.push('/dashboard');
      })
      .catch((response) => {
        console.log('error'+ response);
        this.setState({error:true})
      })
  }

  render(){
    return (
      <div className="login">
      {this.state.error && <div className="error">Sorry there has been an error, Please try again</div>}
        <section>
          <h2>Welcome Back</h2>
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
  router: React.PropTypes.object.isRequired
};

export default Login;
