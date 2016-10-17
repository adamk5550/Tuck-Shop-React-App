import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import Checkout from '../../components/Checkout/Checkout';
import './Scan.css';

class Scan extends Component {

  constructor(props){
    super(props)
    this.state = {
      result: '',
      checkout: false,
      legacy: false
    }
    this.handleScan = this.handleScan.bind(this);
    this.handleError= this.handleError.bind(this); 
  }

  handleScan(data){
    this.setState({
      checkout: !this.state.checkout,
      result: JSON.parse(data),
      legacy: false
    });
  }

  handleError(err){
     console.error(err);
     this.setState({
       result: '',
       checkout: false,
       legacy: true
     });
   }

  render(){
    return(
      <div className="wrapper">
        {!this.state.checkout && <QrReader
          handleError={this.handleError}
          handleScan={this.handleScan}
          legacyMode={this.state.legacy}
          interval={2000} />}
          {this.state.checkout && <Checkout purchase={this.state.result} />}
      </div>
    )
  }
}

export default Scan;
