const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });

  res.status(201).json({
    status: 'success',
    data: { user },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new AppError('Incorrect email or password', 404));

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect)
    return next(new AppError('Incorrect email or password', 404));

  res.status(200).json({ status: 'success', data: { user } });
});
