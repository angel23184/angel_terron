require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 9017;

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(PORT, function() {
  console.log("Example app listening on port 9001!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/credit", require("./src/routes/creditRoutes"));


module.exports = app;
