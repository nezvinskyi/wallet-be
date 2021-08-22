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
      enum: ['debit', 'credit'],
      default: 'debit',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    comments: {
      type: String,
      minLength: [2, 'Name of category should be at least 2 characters'],
    },
    amount: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: false },
);

module.exports = transactionSchema;
