import React, { Component } from 'react';
import { Link } from 'react-router';

import './Header.css';

class Header extends Component {
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
            : <Link className="nav-btn" to=""></Link>}
          <h2 className="nav-btn">Tuck Shop</h2>

          {!isScanPage ?
            <Link className="nav-btn" to="/scan">
              Scan
              <i className="fa fa-qrcode" aria-hidden="true"></i>
            </Link>
            : <Link className="nav-btn" to=""></Link>}
        </div>
    );
  }
}

export default Header;
