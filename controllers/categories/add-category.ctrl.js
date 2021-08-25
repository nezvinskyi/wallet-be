const { Category } = require('../../models');

const addCategory = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    const item = allCategories.find(
      item => item.name.toLowerCase().trim() === req.body.name.toLowerCase().trim(),
    );
    if (item) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: `Category name "${item.name}" exists, choose another name`,
      });
      return;
    }
    const categoryNameNormalized = {
      name: req.body.name.trim(),
    };
    const result = await Category.create(categoryNameNormalized);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: `Category was created`,
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addCategory;
