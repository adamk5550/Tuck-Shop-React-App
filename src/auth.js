import { browserHistory } from 'react-router';

module.exports = {
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
