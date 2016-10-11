import React, { Component } from 'react'
import ReactDom from 'react-dom'
import QrReader from 'react-qr-reader'
import AlertContainer from 'react-alert'
import axios from 'axios'
import Header from './Header'
import { Router, Route, Link, browserHistory } from 'react-router'

class Scan extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: {}
    }

    this.alertOptions = {
      offset: 0,
      position: 'bottom left',
      theme: 'dark',
      time: 0,
      transition: 'scale'
    };
  }

  handleScan(data){
    this.setState({
      result: data,
    })

    let purchased = JSON.parse(data);
    let item = purchased.items[0].name;

    msg.show(item + ' Purchased', {
      type: 'success'
    });
  }

  handleError(err){
    msg.show('Please Try Again', {
      type: 'error'
    });
    console.error(err)
  }

  render(){
    return(
      <div className="wrapper">
        <Header />
        <QrReader
          handleError={this.handleError}
          handleScan={this.handleScan.bind(this)}
          interval={2000} />
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
      </div>
    )
  }
}

export {Scan as default}
