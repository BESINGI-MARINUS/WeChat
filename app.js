const path = require('path');

const express = require('express');
const morgan = require('morgan');

const messageRoutes = require('./Routes/messageRoute');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/messages', messageRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send('./public/index.html');
});

module.exports = app;
