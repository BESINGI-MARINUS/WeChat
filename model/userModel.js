const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name.'],
    trim: true,
    minlength: 2,
    unique: [true, 'Username already taken'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email!'],
    validate: [
      validator.isEmail,
      'Invalid Email. Please enter a valid email address.',
    ],
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: [true, 'Please enter your password'] },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'Passwords do not match',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
