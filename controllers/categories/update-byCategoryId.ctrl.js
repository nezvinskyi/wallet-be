const { Category } = require('../../models');

const updateCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const result = await Category.findOneAndUpdate(
      { _id: categoryId },
      { ...req.body },
      { new: true },
    );
    res.status(200).json({
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed') || null) {
      res.status(404).json({
        message: "Item with this id doesn't exist",
      });
      return;
    }
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = updateCategoryById;
