module.exports = (error, req, res, next) => {
  const status = error.status || 'error';
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({ status, message: error.message });
};
