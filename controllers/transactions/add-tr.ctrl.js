const moment = require('moment');
const { Transaction } = require('../../models');

const addTransaction = async (req, res, next) => {
  try {
    const tr = {
      ...req.body,
      date: `${moment(req.body.date).format('YYYY-MM-DD')}T${moment(Date.now()).format(
        'HH:mm:ss',
      )}.000+00:00`,
      year: moment(req.body.date).format('YYYY'),
      month: moment(req.body.date).format('MM'),
      day: moment(req.body.date).format('DD'),
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
