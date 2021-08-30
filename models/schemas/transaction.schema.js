const { Schema } = require('mongoose');

const transactionSchema = Schema(
  {
    date: {
      type: Date,
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
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = transactionSchema;
