const express = require('express');
const app = express();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/messages', require('./messageapp'));

module.exports = app;