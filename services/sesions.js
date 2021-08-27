const { Session } = require('../models');

const getOne = filter => {
  return Session.findOne(filter);
};

const takeOne = (filter, field) => {
  return Session.findOne(filter, field);
};

const addOne = ({ userId, loginTime, tokenId, usedToken, accessToken }) => {
  const newSession = new Session({ userId, loginTime, tokenId, usedToken, accessToken });
  return newSession.save();
};

const updateById = (id, updateInfo) => {
  return Session.findByIdAndUpdate(id, updateInfo, { new: true });
};

module.exports = {
  getOne,
  addOne,
  updateById,
  takeOne,
};