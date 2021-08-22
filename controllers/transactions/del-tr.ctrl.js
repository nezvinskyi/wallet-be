const { Transaction } = require('../../model');

const delTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.transactionId });
    res.status(200).json({
      status: 'No content',
      code: 200,
      message: `Transaction with id ${req.params.transactionId} was deleted`,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = delTransaction;
