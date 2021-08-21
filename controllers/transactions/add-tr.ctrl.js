const { Transaction } = require('../../model');

const addTransaction = async (req, res, next) => {
  try {
    const result = await Transaction.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = addTransaction;
