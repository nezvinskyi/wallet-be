const { SessionList } = require('../models');

const getOne = filter => {
  return SessionList.findOne(filter);
};

const addOne = ({ userId, loginTime, tokenId, tokenType, usedToken }) => {
  const newSession = new User({ userId, loginTime, tokenId, tokenType, usedToken });
  return newSession.save();
};

const updateById = (id, updateInfo) => {
  return Session.findByIdAndUpdate(id, updateInfo, { new: true });
};

module.exports = {
  getOne,
  addOne,
  updateById,
};