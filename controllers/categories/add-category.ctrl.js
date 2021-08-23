const { Category } = require('../../models');

const addCategory = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    const item = allCategories.find(
      item => item.name.toLowerCase().trim() === req.body.name.toLowerCase().trim(),
    );
    if (item) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Category name "${item.name}" has user already, choose another name`,
      });
      return;
    }
    const categoryNorm = {
      name: req.body.name.trim(),
    };
    const result = await Category.create(categoryNorm);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = addCategory;
