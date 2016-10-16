import React, { Component } from 'react';

import Login from './Login'
import SignUp from './SignUp'
import './Login.css';

class LoginWrapper extends Component{
  constructor(){
    super()
    this.state = {
      login: true
    }
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.setState({login: !this.state.login});
  }

  render(){
    const text = !this.state.login ? 'Already have an Account? ' : 'Create an Account';
    return (
      <div className="login-wrapper">
        <div className="login">
          <section>
            {this.state.login && <Login />}
            {!this.state.login &&<SignUp />}
            <a className="btn-login" onClick={this.handleOnClick}>{text}</a>
          </section>
        </div>
      </div>
    )
  }
}

export default LoginWrapper;
