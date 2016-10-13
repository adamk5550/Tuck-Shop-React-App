import React, { Component } from 'react';
import axios from 'axios'
import QrReader from 'react-qr-reader';

import auth from '../../auth';
import Checkout from '../../components/Checkout/Checkout';
import './Scan.css';

class Scan extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: '',
      checkout: false
    }
  }

  handleScan(data){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ auth.getToken();
    axios.post('https://feedme.allan.cx/api/v1/checkout', JSON.parse(data))
      .then((response) => {
        let purchased = JSON.stringify(response.data);
        this.setState({
          result: purchased,
          checkout: true
        });
      })
      .catch((response) => {
        console.log('error'+ response);
      })
  }


  handleError(err){ console.error(err) }

  render(){
    return(
      <div className="wrapper">
        {!this.state.checkout && <QrReader
          handleError={this.handleError}
          handleScan={this.handleScan.bind(this)}
          interval={2000} />}
          {this.state.checkout && <Checkout purchase={this.state.result} />}
      </div>
    )
  }
}

export default Scan;
