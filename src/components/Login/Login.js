import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class Login extends Component{

  storeToken(data){
    window.localStorage.setItem('token', data.token);
    console.log(data.token);
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
          this.context.router.push('/dashboard');
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
    router: React.PropTypes.object.isRequired
  };

export default Login;
