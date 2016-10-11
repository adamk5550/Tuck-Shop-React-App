import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import './Scan.css';

class Scan extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: {}
    }
  }

  handleScan(data){
    this.setState({
      result: data,
    })

    let purchased = JSON.parse(data);
    let item = purchased.items[0].name;
    alert(item);
  }

  handleError(err){ console.error(err) }

  render(){
    return(
      <div className="wrapper">
        <QrReader
          handleError={this.handleError}
          handleScan={this.handleScan.bind(this)}
          interval={2000} />
      </div>
    )
  }
}

export default Scan;
