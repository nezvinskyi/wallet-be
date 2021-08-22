const { User } = require('../model');

const getById = (id) => User.findById(id);

const getOne = (filter) => {
  return User.findOne(filter);
};

const addUser = ({ email, password, name }) => {
  const newUser = new User({ email, name });
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo);
};

module.exports = {
  getOne,
  addUser,
  getById,
  updateById,
};