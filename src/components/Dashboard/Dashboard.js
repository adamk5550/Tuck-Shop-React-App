import React, { Component } from 'react';
import axios from 'axios';

import './Dashboard.css'
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
      })
      .catch((response) => console.log('error'+response))
  }

  handleOnClick(){
    auth.logout();
  }

  render(){
    return (
      <div className="container">
          <section className="">
            <h2 className="">Account</h2>
            <span className=""> {this.state.account.name} </span>
          </section>
          <section>
            <h2>Transactions</h2>
            <ul>
            {this.state.transactions.map((item) => {
              return (
                <li key={item.id}>£{item.amount}</li>

              )
            })}
            </ul>
          </section>
          <section>
            <button onClick={this.handleOnClick}>Logout</button>
          </section>

      </div>
    )
  }
}

export default Dashboard;
