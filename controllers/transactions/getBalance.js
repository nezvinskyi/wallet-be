const { Transaction } = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;

const getBalance = async (req, res, next) => {
  try {
    // const result = await Transaction.count();
    const userId = req.user._id;
    const query = req.body;

    const incomesData = await Transaction.aggregate([
      // поиск по транзакциям с текущим пользователем, и данными из body:
      //{
      // "type": "income"
      //}
      { $match: { userId: ObjectId(userId), type: 'income' } },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: '$amount',
          },
        },
      },
    ]);

    const expensesData = await Transaction.aggregate([
      // поиск по транзакциям с текущим пользователем, и данными из body:
      //{
      // "type": "expense"
      //}
      { $match: { userId: ObjectId(userId), type: 'expense' } },
      {
        $group: {
          _id: null,
          totalExpense: {
            $sum: '$amount',
          },
        },
      },
    ]);

    const incomes = incomesData[0]?.totalIncome || null;
    const expenses = expensesData[0]?.totalExpense || null;

    const balance = incomes - expenses;

    res.status(200).json({
      balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBalance;
