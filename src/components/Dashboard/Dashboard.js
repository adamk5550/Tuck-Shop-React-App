import React, { Component } from 'react';
import Avatar from 'react-avatar'
import axios from 'axios';

import './Dashboard.css'
import auth from '../../auth'

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state = {
      purchases: [],
      account: []
    };
  }

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
    axios.get('https://feedme.allan.cx/api/v1/account')
      .then((response) => {
        this.setState({
          purchases: (response.data.purchases) ? response.data.purchases : [],
          account: response.data.account
        });
      })
      .catch((err) => console.log('error '+ JSON.stringify(err)))
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

    if (previousOrders === []) {
      return 'You have no previous transactions'
    }

    const avatarStyle = {
      border: '1px white solid'
    }

    return (
      <div className="container">
          <section className="user">
            <Avatar round name={this.state.account.name} style={avatarStyle}/>
            <h4>{this.state.account.name}</h4>
          </section>

          <section>
            <p>Previous Order</p>
            <ul>{previousOrders}</ul>
          </section>
      </div>
    )
  }
}

export default Dashboard;
