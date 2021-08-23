const getAllCategories = require('./getAll-categories.ctrl');
const getCategoryById = require('./getBy-categoryId.ctrl');
const addCategory = require('./add-category.ctrl');
const updateCategoryById = require('./update-byCategoryId.ctrl');
const delCategory = require('./del-category.ctrl');

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategoryById,
  delCategory,
};
