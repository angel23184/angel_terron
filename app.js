require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

setTimeout(() => {
  mongoose.Promise = Promise;
  mongoose
    .connect("mongodb://angel_terron_mongodb_1/cabifybootcamp")
    .then(x => {
      console.log(`Connected to Mongo!`);
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });
}, 1000);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(9001, function() {
  console.log("Example app listening on port 9001!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/messages", require("./messageRoute"));

module.exports = app;
