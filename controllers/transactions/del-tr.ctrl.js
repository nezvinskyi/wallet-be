const { Transaction } = require('../../models');

const delTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.transactionId });
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: `Transaction with id ${req.params.transactionId} was deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = delTransaction;
