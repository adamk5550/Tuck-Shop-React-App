import React, { Component } from 'react';
import axios from 'axios'

import auth from '../../auth';
import './Checkout.css';

class Checkout extends Component {
  constructor(props){
    super(props)
    this.state = {
      'products': [],
      'purchased': []
    };
  }


  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
    axios.get('https://feedme.allan.cx/api/v1/app_products')
      .then((response) => {
        const products = response.data;
        const purchased = this.props.purchase.items;

        const purchasedItems = purchased.map(i => {
          return products.find(p => {
            return i.product_id === p.id;
          })
        });
        this.setState({
          'products': products,
          'purchased': purchasedItems
        })
      })
      .catch((response) => {
        console.log('error'+ response);
      })
  }

  handleOnClick(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
    axios.post('https://feedme.allan.cx/api/v1/checkout', this.props.purchase)
      .then((response) => {
        let purchased = JSON.stringify(response.data);
        alert(purchased);
      })
      .catch((response) => {
        console.log('error'+ response);
      })
  }

  render(){
    const { products, purchased } = this.state;
    return(
      <div className="wrapper">
        <div className="card">
          <div className="card-header"><h4> Checkout </h4></div>
          <div className="card-container">
            {purchased.map((item, idx) => {
              console.log(item);
              return <div key={idx}>{item.product_name} + {item.price}</div>
            })}
          </div>
        </div>

        <div type="submit" className="btn" onClick={this.handleOnClick.bind(this)}>
          Order
        </div>
      </div>
    )
  }
}

export default Checkout;
