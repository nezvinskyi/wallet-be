const { Category } = require('../../models');

const delCategory = async (req, res) => {
  console.log('del ctrl.....');
  try {
    await Category.findOneAndDelete({ _id: req.params.categoryId });
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: `Category with id ${req.params.categoryId} was deleted`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      res.status(404).json({
        message: "Item with this id doesn't exist",
      });
    }
    res.status(404).json({ error: error.message });
  }
};

module.exports = delCategory;
