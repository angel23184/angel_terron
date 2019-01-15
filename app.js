require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbName = "cabifybootcamp";
//const server = "angel_terron_mongodb_1"
const serverL1 = "localhost:27017"
const serverL2 = "localhost:27018"


const trm =setInterval(() => {
  mongoose.Promise = Promise;
  mongoose
    .createConnection(`mongodb://${serverL1}/${dbName}`)
    .then(x => {
      console.log(`Connected to Mongo!`);
      clearInterval(trm)
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });
}, 1000);

const trm2 =setInterval(() => {
  mongoose.Promise = Promise;
  mongoose
    .createConnection(`mongodb://${serverL2}/${dbName}`)
    .then(x => {
      console.log(`Connected to Mongo!`);
      clearInterval(trm2)
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

app.use("/messages", require("./routes/messageRoute"));
app.use("/credit", require("./routes/creditRoutes"));

module.exports = app;
