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
    axios.get('https://feedme.allan.cx/api/v1/account')
      .then((response) => {
        this.setState({
          transactions: response.data.transactions,
          account: response.data.account
        });
      })
      .catch((response) => console.log('error'+response))
  }

  handleOnClick(){
    auth.logout();
  }

  render(){
      console.log(this.state.account);
    return (
      <div className="container">
          <section className="">
            <h2>Your Account</h2>
          </section>
          <section>
            <h2>Previous Order</h2>
          </section>
          <section>
            <button onClick={this.handleOnClick}>Logout</button>
          </section>

      </div>
    )
  }
}

export default Dashboard;
