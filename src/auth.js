import { browserHistory } from 'react-router';

module.exports = {
  storeToken(data) {
    return window.localStorage.setItem('token', data.token);
  },

  getToken() {
    return localStorage.token
  },

  logout() {
    delete localStorage.token;
    browserHistory.push('/');
  },

  loggedIn() {
    return !!localStorage.token
  }
}
