const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.status(200).send('./public/index.html');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listening to request on port 3000');
});
