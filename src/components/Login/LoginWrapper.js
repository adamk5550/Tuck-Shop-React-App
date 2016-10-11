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
      <div>
        <div className="login">
          {this.state.login && <Login />}
          {!this.state.login &&<SignUp />}
        </div>
        <section>
          <button onClick={this.handleOnClick}>{text}</button>
        </section>
      </div>
    )
  }
}

export default LoginWrapper;
