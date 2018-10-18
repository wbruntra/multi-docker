const keys = require('./keys');

// Setup express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route handlers
app.get('/', (req, res) => {
  res.send('Hi');
});

app.use('/', require('./api'))

app.listen(5000, err => {
  console.log('Listening...');
});
