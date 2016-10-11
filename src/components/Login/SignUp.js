import React, { Component } from 'react';

import './Login.css';

class SignUp extends Component{

    render(){
      return (
        <div className="login">
          <section>
            <h2>Sign Up</h2>
            <form ref="form">
              <input name="email" ref="email" placeholder="Email" type="text" /><br/>
              <input name="password" ref="password" placeholder="Password" type="password" /><br/>
              <input value="Sign Up" type="submit" />
            </form>
          </section>
        </div>
      )
    }
  }

export default SignUp;
