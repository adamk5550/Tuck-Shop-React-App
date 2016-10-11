import React, { Component } from 'react';
import axios from 'axios';

import auth from '../../auth'

class Dashboard extends Component{
  constructor(){
    super()
    this.state = {
      transactions: [],
      account: []
    }
  }
  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
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
          <section className="panel">
            <h2>Account</h2>
            <span>{this.state.account.name} </span>
          </section>
          <section className="panel">
            <h2>Transactions</h2>
            <ul>
            {this.state.transactions.map((item) => {
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

export default Dashboard;
