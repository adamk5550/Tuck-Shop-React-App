import React, { Component } from 'react';

import './App.css';
import auth from '../../auth'
import Header from '../Header/Header';

class App extends Component {

  render() {
    let showNav = auth.loggedIn()
    return (
      <div className="App">
        {showNav && <Header />}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
