import React, { Component } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import browserHistory from 'react-router';

import auth from '../../auth'
import './Login.css';

class SignUp extends Component{
  constructor(){
    super()
    this.state = {
      error: false,
      success: false,
      data: {}
    }
  }

  handleClick(){
    auth.storeToken(this.state.data.token);
    this.context.router.push('/dashboard');
  }

  SignUp(e){
    e.preventDefault();
    axios.post('https://feedme.allan.cx/api/v1/signup',
      {
        'name': ReactDom.findDOMNode(this.refs.name).value,
        'email': ReactDom.findDOMNode(this.refs.email).value,
        'password': ReactDom.findDOMNode(this.refs.password).value,
        'promo_code': ReactDom.findDOMNode(this.refs.promo_code).value
      })
      .then((response) => {
        this.setState({error:false, success:true, data:response.data})
        console.log(response.data.token);

      })
      .catch((response) => {
        console.log('error' + response);
        this.setState({error:true, success:false, data:response})
      })
  }
  render(){
    return (
      <div className="login">
      {this.state.error && <div className="error">There has been an issue, Please try again</div>}
        <section>
          {!this.state.success ? <h2 className="btn-login">Create Account</h2> :
          <div>
            <h2 className="btn-login"> Account created </h2><br/>
            <h2 className="btn-login" onClick={this.handleClick.bind(this)}> Login ? </h2>
          </div>}
          {!this.state.success && <form ref="form" onSubmit={this.SignUp.bind(this)}>
            <input name="name" ref="name" placeholder="Your Full Name" type="text" /><br/>
            <input name="email" ref="email" placeholder="Your Email" type="text" /><br/>
            <input name="password" ref="password" placeholder="Password" type="password" /><br/>
            <input name="promo_code" ref="promo_code" placeholder="Promo code" type="text" /><br/>
            <input value="Sign Up" type="submit" />
          </form> }
        </section>
      </div>
    )
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignUp;
