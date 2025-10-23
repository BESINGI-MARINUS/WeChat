const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'A message must have texts'],
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.ObjectId, ref: 'Room' },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
