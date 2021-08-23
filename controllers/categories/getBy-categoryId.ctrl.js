const { Category } = require('../../models');

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const result = await Category.findById(categoryId);

    if (!result) {
      return res.status(404).json({
        message: "Item with this id doesn't exist",
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      res.status(404).json({
        message: "Item with this id doesn't exist",
      });
    }
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = getCategoryById;
