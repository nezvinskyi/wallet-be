const { Transaction } = require('../../models');

const getAllTransactions = async (req, res, next) => {
  try {
    const result = await Transaction.find({ userId: req.user._id });

    if (result?.length === 0) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          message: `User ${req.user.email} does not have any transactions yet`,
        },
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        message: `There are transactions for user ${req.user.email}`,
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllTransactions;
