const { Schema } = require('mongoose');

const sessionSchema = new Schema(
  {
    userId: {
      type: String
    },
    loginTime: {
      type: String,
    },
    tokenId: {
      type: String,
    },
    usedToken: {
      type: String,
    },
  },
  { timestamps: true },
);


module.exports = sessionSchema;