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
    res.status(404).json({ error: error.message });
  }
};

module.exports = delTransaction;
