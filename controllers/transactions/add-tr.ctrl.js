const moment = require('moment');
const { Transaction } = require('../../models');

const addTransaction = async (req, res, next) => {
  try {
    const tr = {
      ...req.body,
      date: moment(req.body.date).format('YYYY-MM-DD'),
      year: moment(req.body.date).format('YYYY'),
      month: moment(req.body.date).format('MM'),
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
