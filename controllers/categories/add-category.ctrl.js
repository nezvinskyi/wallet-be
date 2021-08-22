const { Category } = require('../../model');

const addCategory = async (req, res, next) => {
  try {
    const result = await Category.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = addCategory;
