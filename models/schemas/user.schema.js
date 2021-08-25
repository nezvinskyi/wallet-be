const { Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    // Это тут не нужно писать. Ты это не передаешь в БД
    // confirmPassword: {
    //   type: String,
    //   required: [true, 'Confirmation of password is required'],
    // },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    // token: {
    //TODO: мы не храним токен в БД. только на клиенте в localStorage
    //   type: String,
    //   default: null,
    // },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { protocol: 'https' });
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

module.exports = userSchema;
