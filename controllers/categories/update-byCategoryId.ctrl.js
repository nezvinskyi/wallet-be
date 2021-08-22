const { Category } = require('../../models');

const updateCategoryById = async (req, res) => {
  try {
    const result = await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { ...req.body },
      { new: true },
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = updateCategoryById;
