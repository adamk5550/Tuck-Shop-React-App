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
    console.log(this.state.purchases);
    let previousOrders = Object.keys(this.state.purchases).map((i) => {
        return (
          <div className="card" id={this.state.purchases[i]}>
          <div className="card-header">
            <span className="pull-left"> {this.state.purchases[i].date} </span>
            <span className="pull-right">{' £'+this.state.purchases[i].total}</span>
          </div>
          <div className="card-container">{this.state.purchases[i].products}</div>
          </div>
        )
    })

    const avatarStyle = {
      border: '1px white solid',
      margin: '20px'
    }

    return (
      <div className="container">
          <section className="user">
            <span className="pull-left"><Avatar round name={this.state.account.name} style={avatarStyle}/></span>
            <span className="pull-left">
              {!this.state.account.balance == null ? <h2 className="h2-dash">£ {this.state.account.balance}</h2> : <h2 className="h2-dash">£0.00</h2>}
              <h2 className="h2-dash">{this.state.account.name}</h2>
            </span>
          </section>

          <section>
            <div className="card-header">Previous Orders</div>
            {!this.state.purchases == null ? <ul>{previousOrders.reverse()}</ul> : <h4>Looks like you need to make an order!</h4>}
          </section>
      </div>
    )
  }
}

export default Dashboard;
