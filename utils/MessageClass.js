const Message = require('../model/messageModel');

class MessageClass {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }

  async createEmitMessage(msg) {
    try {
      const newMessage = await Message.create({ content: msg });

      // Include the offset with the message. ie newMessage.id
      this.io.emit('chat message', msg, newMessage.id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sendMissedMessages() {
    // if the connection state recovery was not successful
    try {
      const serverOffset = this.socket.handshake.auth.serverOffset; // Will be undefined for a new client

      // 1. Create the base query object
      const query = {};
      if (serverOffset) {
        // If the client has a serverOffset, find messages with an _id
        // (ObjectId) that is "greater than" (created after) that offset.
        query._id = { $gt: serverOffset };
      }

      // 2. Use a cursor to stream results (the Mongoose equivalent of db.each)
      // This is vital for performance. It doesn't load all messages into memory.
      const cursor = Message.find(query)
        .select('content') // Only get content and _id
        .sort({ _id: 1 }) // Ensure messages are sent in chronological order
        .cursor();

      // 3. Iterate over the cursor and emit each message to the socket
      for await (const doc of cursor) {
        // doc.id is the string representation of doc._id
        // This string is what the client should store as its offset
        this.socket.emit('chat message', doc.content, doc.id);
      }
    } catch (e) {
      console.error('Error fetching missed messages:', e);
      throw e;
    }
  }
}

module.exports = MessageClass;
