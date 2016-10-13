import React, { Component } from 'react';

import './Checkout.css';

class Checkout extends Component {

  render(){
    return(
      <div className="wrapper">
        {this.props.purchase}
      </div>
    )
  }
}

export default Checkout;
