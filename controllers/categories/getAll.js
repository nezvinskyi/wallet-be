const { Category } = require('../../model');

const getAll = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAll;
