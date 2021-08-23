const { Schema } = require('mongoose');

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
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
  { versionKey: false, timestamps: false },
);

module.exports = transactionSchema;
