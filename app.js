const path = require('path');
const http = require('http');

const express = require('express');
const morgan = require('morgan');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.status(200).send('./public/index.html');
});

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log('Listening to request on port 3000');
});
