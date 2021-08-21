const { Schema } = require('mongoose');

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
    type: { type: String },
    category: {
      type: String,
      enum: [
        'Продукты',
        'Машина',
        'Забота о себе',
        'Забота о детях',
        'Товары для дома',
        'Образование',
        'Досуг',
        'Другие расходы',
      ],
      required: [true, 'Category is required'],
    },
    comments: { type: String },
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
