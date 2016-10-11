import React, { Component } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Header from './Header'
import { Router, Route, Link, browserHistory } from 'react-router'

class Dashboard extends React.Component{
  constructor(){
    super()
    this.state = {
      transactions: [],
      account: []
    }
  }
  componentDidMount(){

    axios.defaults.headers.common['Authorization'] = 'Bearer '+window.localStorage.getItem('token');
    axios.get('https://tuckshop.allan.cx/api/v1/account')
      .then((response) => {
        var account = response.data.account;
        this.setState({
          transactions: response.data.transactions,
          account: account
        });
        console.log(this.state)
        console.log(this.state.transactions);
      })
      .catch((response) => console.log('error'+response))
  }
  render(){
    return (
      <div className="container">
        <Header />
          <section className="panel">
            <h2>Account</h2>
            <span>{this.state.account.name} </span>
            <img src={this.state.account.grav} />
          </section>
          <section className="panel">
            <h2>Transactions</h2>
            <ul>
            {this.state.transactions.map((item) => {
              var i = 0;
              return (
                <li key={item.id}>£{item.amount}</li>
              )
            })}
            </ul>
          </section>
      </div>
    )
  }
}

export {Dashboard as default}
