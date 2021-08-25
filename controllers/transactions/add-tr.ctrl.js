const { Transaction } = require('../../models');

const addTransaction = async (req, res, next) => {
  try {
    const tr = {
      ...req.body,
      userId: req.user._id,
      userEmail: String(req.user.email),
    };
    const result = await Transaction.create(tr);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addTransaction;
