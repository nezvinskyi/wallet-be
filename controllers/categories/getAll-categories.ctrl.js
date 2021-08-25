const { Category } = require('../../models');

const getAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
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

module.exports = getAllCategories;
