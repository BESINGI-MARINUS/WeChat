const Message = require('../model/messageModel');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getSignup = (req, res, next) => {
  res.status(200).render('signup', { title: 'Sign Up - LinkUp' });
};

exports.getlogin = (req, res, next) => {
  res.status(200).render('login', { title: 'Login - LinkUp' });
};

exports.getLandingPage = (req, res, next) => {
  res.status(200).render('landing', { title: 'LinkUp - Connect and Chat' });
};

exports.getChatPage = catchAsync(async (req, res, next) => {
  const users = await User.find({ _id: { $ne: req.user.id } });
  res.status(200).render('chatsPage', { title: 'LinkUp', users });
});
