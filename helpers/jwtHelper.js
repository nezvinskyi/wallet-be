const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SessionList } = require('../models');

const { JWT_SECRET } = process.env;

const getAccessToken = (userId) => {
  const payload = {
    id: userId,
    type: 'access',
    iat: Math.floor(Date.now() / 1000),
  };
  return {
    id: payload.id,
    token: jwt.sign(payload, JWT_SECRET, { expiresIn: '2m' })
  };
};

const getRefreshToken = () => {
  const payload = {
    id: uuidv4(),
    type: 'refresh',
    iat: Math.floor(Date.now() / 1000),
  };
  return {
    id: payload.id,
    token: jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }),
  };
};

const replaceDbRefreshToken = (tokenId, userId) => {
  SessionList.findOneAndRemove({ userId })
    .exec()
    .then(() => SessionList.create({ tokenId, userId }));
}

module.exports = {
  getAccessToken,
  getRefreshToken,
  replaceDbRefreshToken,
};