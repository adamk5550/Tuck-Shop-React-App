import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import Checkout from '../../components/Checkout/Checkout';
import './Scan.css';

class Scan extends Component {

  constructor(props){
    super(props)
    this.state = {
      result: '',
      checkout: false
    }
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data){
    this.setState({
      checkout: !this.state.checkout,
      result: JSON.parse(data)
    });
  }

  handleError(err){
     console.error(err);
   }

  render(){
    // // Prefer camera resolution nearest to 1280x720.
    // var constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
    //
    // navigator.mediaDevices.getUserMedia(constraints)
    // .then(function(mediaStream) {
    //   var video = document.querySelector('video');
    //   video.srcObject = mediaStream;
    //   video.onloadedmetadata = function(e) {
    //     video.play();
    //   };
    // })
    // .catch(function(err) { console.log(err.name + ": " + err.message); }); // always
    return(
      <div className="wrapper">
        {!this.state.checkout && <QrReader
          handleError={this.handleError}
          handleScan={this.handleScan}
          facingMode={'rear'}
          interval={2000} />}
          {this.state.checkout && <Checkout purchase={this.state.result} />}
      </div>
    )
  }
}

export default Scan;
