const Message = require('../model/messageModel');

exports.createMessage = (req, res, next) => {};

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      status: 'success',
      result: messages.length,
      data: { messages },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Fail to get messages' });
  }
};
