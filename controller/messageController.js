const Message = require('../model/messageModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createMessage = (req, res, next) => {};

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find().populate({
    path: 'user',
    select: 'name',
  });
  if (!messages) return next(new AppError('Fail to get messages', 404));
  res.status(200).json({
    status: 'success',
    result: messages.length,
    data: { messages },
  });
});
