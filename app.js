const path = require('path');

const express = require('express');
const morgan = require('morgan');

const messageRoutes = require('./Routes/messageRoute');
const userRoutes = require('./Routes/userRoute');

const app = express();

app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parcer
app.use(express.json());

app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send('./public/index.html');
});

module.exports = app;
