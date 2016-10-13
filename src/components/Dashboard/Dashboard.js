import React, { Component } from 'react';
import Avatar from 'react-avatar'
import axios from 'axios';

import './Dashboard.css'
import auth from '../../auth'

class Dashboard extends Component{
  constructor(){
    super()
    this.state = {
      purchases: [],
      account: []
    }
  }

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
    axios.get('https://feedme.allan.cx/api/v1/account')
      .then((response) => {
        this.setState({
          purchases: response.data.purchases,
          account: response.data.account
        });
        console.log(response.data);
      })
      .catch((response) => console.log('error'+response))
  }

  handleOnClick(){
    auth.logout();
  }

  render(){

    let previousOrders = Object.keys(this.state.purchases).map((i) => {
        return (
          <li id={this.state.purchases[i]}>
          {this.state.purchases[i].products + ' £'+this.state.purchases[i].total}
          </li>
        )
    })

    return (
      <div className="container">
          <section className="user">
            <Avatar round name={this.state.account.name} />
            <h2>{this.state.account.name}</h2>
          </section>
          <section>
            <h2>Previous Order</h2>
            <ul>{previousOrders}
            <li>wooooo</li></ul>
          </section>
      </div>
    )
  }
}

export default Dashboard;
