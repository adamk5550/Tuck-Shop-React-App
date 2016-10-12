import React, { Component } from 'react';

import './Login.css';

class SignUp extends Component{
  render(){

    return (
      <div className="login">
        <section>
          <h2>Create Account</h2>
          <form ref="form">
            <input name="firstName" ref="firstName" placeholder="Your First Name" type="text" /><br/>
            <input name="firstName" ref="surname" placeholder="Your Last Name" type="text" /><br/>
            <input name="email" ref="email" placeholder="Your Email" type="text" /><br/>
            <input name="password" ref="password" placeholder="Password" type="password" /><br/>
            <input value="Sign Up" type="submit" />
          </form>
        </section>
      </div>
    )
  }
}

export default SignUp;
