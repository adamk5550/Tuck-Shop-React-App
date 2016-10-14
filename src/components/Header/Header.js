import React, { Component } from 'react';
import { Link } from 'react-router';

import auth from '../../auth'
import './Header.css';

class Header extends Component {

  handleOnClick(){
    auth.logout();
  }

  render() {

  const isScanPage = location.pathname === '/scan';
  const isDashboardPage = location.pathname === '/dashboard';

    return (
        <div className="app-header">
          {!isDashboardPage ?
            <Link className="nav-btn" to="/dashboard">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
            Back
            </Link>
            : <Link className="nav-btn" onClick={this.handleOnClick}>Logout</Link>}

          <h2 className="nav-btn">&nbsp;</h2>

          {!isScanPage ?
            <Link className="nav-btn" to="/scan">
              Scan
            </Link>
            : <Link className="nav-btn" to=""></Link>}
        </div>
    );
  }
}

export default Header;
