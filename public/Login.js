// import React, { Component } from 'react'
// import ReactDom from 'react-dom'
// import axios from 'axios'
// import { Router, Route, Link, browserHistory } from 'react-router'
//
//
// class Login extends React.Component{
//     storeToken(data){
//     window.localStorage.setItem('token', data.token);
//   }
//   login(e){
//     e.preventDefault();
//     axios.post('http://tuckshop.allan.cx/api/v1/authenticate',
//       {
//         'email': ReactDom.findDOMNode(this.refs.email).value,
//         'password': ReactDom.findDOMNode(this.refs.password).value
//       })
//       .then((response) => {
//         this.storeToken(response.data)
//         this.context.history.replaceState(null, '/dashboard')
//       })
//       .catch((response) => console.log('error'+response))
//   }
//   render(){
//     return (
//       <div className="flex-center-align">
//         <section className="panel">
//           <h2>Sign In</h2>
//           <form ref="form" onSubmit={this.login.bind(this)}>
//             <label >Email</label>
//             <input name="email" ref="email" type="text" /><br/>
//
//             <label >Password</label> 
//             <input name="password" ref="password" type="password" /><br/>
//             <input value="Sign In" type="submit" />
//           </form>
//         </section>
//       </div>
//     )
//   }
// }
//
// Login.contextTypes = {
//   history: React.PropTypes.object
// }
//
//
// var redirect = (nextState, replaceState) => {
//   let token = window.localStorage.getItem('token');
//   if(token !== null){
//     replaceState(null, '/dashboard');
//   }else{
//     return true
//   }
// }
//
// var auth = (nextState, replaceState) => {
//   let token = window.localStorage.getItem('token');
//   if(token === null){
//     replaceState(null, '/');
//   }else{
//     return true
//   }
// }
//
// export default Login;
