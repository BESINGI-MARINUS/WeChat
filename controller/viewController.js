exports.getSignup = (req, res, next) => {
  res.status(200).render('signup');
};

exports.getlogin = (req, res, next) => {
  res.status(200).render('login');
};
