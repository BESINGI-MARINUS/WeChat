const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const sendResponse = (res, statusCode, user) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });
  sendResponse(res, 201, user);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new AppError('Incorrect email or password', 404));

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect)
    return next(new AppError('Incorrect email or password', 404));
  sendResponse(res, 200, user);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1. Get token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token)
    return next(
      new AppError(
        'You are not logged in. Please login to see all mesages.',
        401
      )
    );

  //2. Verify if token is still valid.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);

  // 3. Get user belonging to this token.
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError('The user belonging to this token no longer exist.', 401)
    );

  // 4. Check if user changed their password after token was issued.
  if (user.passwordChangedAfterTokenIssue(decoded.iat))
    return next(
      new AppError('User recently changed password. Please login again.', 401)
    );

  // 5. Grant user access to protected route and put user on the request object
  req.user = user;
  next();
});
