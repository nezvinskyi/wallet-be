const { Schema } = require('mongoose');

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: [2, 'Name of category should be at least 2 characters'],
    },
  },
  { versionKey: false, timestamps: false },
);

module.exports = categorySchema;
