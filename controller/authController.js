const User = require('../model/userModel');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
