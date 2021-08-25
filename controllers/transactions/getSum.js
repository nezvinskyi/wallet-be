const { Transaction } = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;

const getSum = async (req, res, next) => {
  try {
    // const result = await Transaction.count();
    const userId = req.user._id;
    const query = req.body;

    const result = await Transaction.aggregate([
      // поиск по транзакциям с текущим пользователем, и данными из body:
      //{
      // "type": "income"
      //}
      { $match: { userId: ObjectId(userId), ...query } },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$amount',
          },
        },
      },
    ]);

    console.log(result[0].total);

    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSum;
