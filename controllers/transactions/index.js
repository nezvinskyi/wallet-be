const addTransaction = require('./add-tr.ctrl');
const delTransaction = require('./del-tr.ctrl');
const getAllTransactions = require('./getAll-tr.ctrl');
const getBalance = require('./getBalance');
const updateTransaction = require('./update-tr.ctrl');

module.exports = {
  addTransaction,
  delTransaction,
  getAllTransactions,
  getBalance,
  updateTransaction,
};
