import React, { Component } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';

import auth from '../../auth'
import './Login.css';

class SignUp extends Component{
  SignUp(e){
    e.preventDefault();
    axios.post('https://feedme.allan.cx/api/v1/signup',
      {
        'firstName': ReactDom.findDOMNode(this.refs.firstName).value,
        'surname': ReactDom.findDOMNode(this.refs.surname).value,
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
        <section>
          <h2>Create Account</h2>
          <form ref="form" onSubmit={this.SignUp.bind(this)}>
            <input name="firstName" ref="firstName" placeholder="Your First Name" type="text" /><br/>
            <input name="surname" ref="surname" placeholder="Your Last Name" type="text" /><br/>
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
