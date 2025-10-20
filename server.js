const http = require('http');
const app = require('./app');

const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('chat message', (msg) => {
    console.log(`MESSAGE: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log('Listening to request on port 3000');
});
