const { Schema } = require('mongoose');

const transactionSchema = Schema(
  {
    date: {
      type: String,
    },
    year: {
      type: String,
    },
    month: {
      type: String,
    },
    day: {
      type: String,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    userEmail: {
      type: String,
    },
    comments: {
      type: String,
      minLength: [2, 'Name of category should be at least 2 characters'],
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = transactionSchema;
