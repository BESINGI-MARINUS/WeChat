const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A message must have content'],
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: [true, 'A mesage must belong to a user'],
  },
  room: { type: mongoose.Schema.ObjectId, ref: 'Room' },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
