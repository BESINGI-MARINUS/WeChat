const Message = require('../model/messageModel');

exports.getSignup = (req, res, next) => {
  res.status(200).render('signup', { title: 'Sign Up - LinkUp' });
};

exports.getlogin = (req, res, next) => {
  res.status(200).render('login', { title: 'Login - LinkUp' });
};

exports.getLandingPage = (req, res, next) => {
  res.status(200).render('landing', { title: 'LinkUp - Connect and Chat' });
};

exports.getChatPage = (req, res, next) => {
  const messages = Message.find();
  res.status(200).render('chatsPage', { title: 'LinkUp', messages });
};
