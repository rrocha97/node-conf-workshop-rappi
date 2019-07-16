const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OK } = require('http-status-codes');

const app = express();
const Routes = require('./src/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  exposedHeaders: ['Total-Count', 'Total-Pages'],
}));

// add heathCheck
app.use('/health', (req, res) => {
  res.status(OK).json({ message: 'OK' });
});

app.use(Routes);

module.exports = app;
