const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MessageClass = require('./utils/MessageClass.js');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB Connected successfully'))
  .catch((err) => console.log(err));

const { Server } = require('socket.io');
const AppError = require('./utils/AppError.js');
const server = http.createServer(app);
const io = new Server(server, { connectionStateRecovery: {} }); //Deliver message when a user reconnects.

io.use((socket, next) => {
  const userId = socket.handshake.auth.user;
  console.log(userId);

  if (!userId) return next(new AppError('Invalid user ID', 401));

  socket.userId = userId;
  next();
});

io.on('connection', async (socket) => {
  socket.on('chat message', async (msg) => {
    try {
      await new MessageClass(socket, io).createEmitMessage(msg);
    } catch (err) {
      console.log(err.message);
    }
  });

  if (!socket.recovered) {
    try {
      await new MessageClass(socket, io).sendMissedMessages();
    } catch (err) {
      console.log(err.message);
    }
  }

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected.`);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening to request on port ${port}`);
});
