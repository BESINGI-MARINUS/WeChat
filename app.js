const path = require('path');

const express = require('express');
const morgan = require('morgan');

const messageRoutes = require('./Routes/messageRoute');
const userRoutes = require('./Routes/userRoute');
const viewRoutes = require('./Routes/viewRoute');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', `${path.join(__dirname, 'view')}`);

// Body parcer
app.use(express.json());

app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/', viewRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send('./public/index.html');
});

app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server.`);
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
