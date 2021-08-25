const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateName = require('./updateName');
const refreshTokens = require('./refreshTokens');

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateName,
  refreshTokens,
};