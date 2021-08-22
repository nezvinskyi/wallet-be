const { Category } = require('../../model');

const delCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.params.categoryId });
    res.status(200).json({
      status: 'No content',
      code: 200,
      message: `Category with id ${req.params.categoryId} was deleted`,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = delCategory;
