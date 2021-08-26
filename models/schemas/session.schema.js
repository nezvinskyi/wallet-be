const { Schema } = require('mongoose');

const sessionSchema = new Schema(
  {
    userId: {
      type: String
    },
    loginTime: {
      type: String,
    },
    logoutTime: {
      type: String,
    },
    tokenId: {
      type: String,
    },
    usedToken: {
      type: String,
    },
    validToken: {
      type: Boolean,
      default: true,
    },
    accessToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false },
);


module.exports = sessionSchema;