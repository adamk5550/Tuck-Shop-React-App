import React, { Component } from 'react';
import axios from 'axios'

import auth from '../../auth';
import './Checkout.css';

class Checkout extends Component {

  handleOnClick(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
    axios.post('https://feedme.allan.cx/api/v1/checkout', JSON.parse(this.props.purchase))
      .then((response) => {
        let purchased = JSON.stringify(response.data);
        alert(purchased);
      })
      .catch((response) => {
        console.log('error'+ response);
      })
  }

  render(){
    return(
      <div className="wrapper">
        <div className="card">
          <div className="card-container">{JSON.stringify(this.props.purchase)}</div>
        </div>

        <div className="card" onClick={this.handleOnClick.bind(this)}>
          <div className="card-container"><h2>Order</h2></div>
        </div>
      </div>
    )
  }
}

export default Checkout;
