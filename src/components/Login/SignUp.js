import React, { Component } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';

import './Login.css';

class SignUp extends Component{
  SignUp(e){
    e.preventDefault();
    axios.post('https://feedme.allan.cx/api/v1/signup',
      {
        'name': ReactDom.findDOMNode(this.refs.name).value,
        'email': ReactDom.findDOMNode(this.refs.email).value,
        'password': ReactDom.findDOMNode(this.refs.password).value,
        'promo': ReactDom.findDOMNode(this.refs.promo).value
      })
      .then((response) => {

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
            <input name="name" ref="name" placeholder="Your Full Name" type="text" /><br/>
            <input name="email" ref="email" placeholder="Your Email" type="text" /><br/>
            <input name="password" ref="password" placeholder="Password" type="password" /><br/>
            <input name="promo" ref="promo" placeholder="Promo code" type="text" /><br/>
            <input value="Sign Up" type="submit" />
          </form>
        </section>
      </div>
    )
  }
}

export default SignUp;
