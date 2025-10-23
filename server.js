const http = require('http');
const Message = require('./model/messageModel');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
const server = http.createServer(app);
const io = new Server(server, { connectionStateRecovery: {} }); //Deliver message when a user reconnects.

io.on('connection', (socket) => {
  console.log(`New user connected with id: ${socket.id}`);

  socket.on('chat message', async (msg) => {
    try {
      await Message.create({ text: msg });
      io.emit('chat message', msg);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected.`);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening to request on port ${port}`);
});
