const { Transaction } = require('../../models');

const updateTransaction = async (req, res) => {
  try {
    const result = await Transaction.findOneAndUpdate(
      { _id: req.params.transactionId },
      { ...req.body },
      { new: true },
    );
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateTransaction;
