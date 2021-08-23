const { Transaction } = require('../../models');

const addTransaction = async (req, res, next) => {
  // console.log(req.user.email);
  try {
    const tr = {
      ...req.body,
      userId: req.user._id,
      userEmail: String(req.user.email),
    };
    const result123 = await Transaction.create(tr);
    res.status(201).json({
      result: result123,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = addTransaction;
