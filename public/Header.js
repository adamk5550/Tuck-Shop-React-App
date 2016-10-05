import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

class Header extends React.Component{
  render(){

    return (
      <header className="bar-header">
      <div className="button-box">
        <Link className="btn" to="/dashboard">Back</Link>
      </div>
        <h2>Tuck Shop </h2>
        <div className="button-box">
          <Link className="btn" to="/scan">Scan</Link>
        </div>
      </header>
    )
  }
}

export {Header as default}
