import { browserHistory } from 'react-router';

module.exports = {
  // Token
  getToken() {
    return localStorage.token
  },

  storeToken(data) {
    return window.localStorage.setItem('token', data.token);
  },

  token() {
    return window.localStorage.getItem('token')
  },

  // Login Authentication
  loggedIn() {
    return !!localStorage.token
  },

  logout() {
    delete localStorage.token;
    browserHistory.push('/');
  }
}
