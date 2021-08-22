const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateName = require('./updateName');

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateName,
};