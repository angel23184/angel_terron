const mongoose = require("mongoose");
const dbName = "cabifybootcamp";
const serverL1 = "localhost:27017";
const serverL2 = "localhost:27018";

// const connectionDB = (server, dbname) => {
//   const trm = setInterval(() => {
//     mongoose.Promise = Promise;
//     mongoose
//       .createConnection(`mongodb://${server}/${dbname}`)
//       .then(x => {
//         console.log(`Connected to Mongo!`);
//         clearInterval(trm);
//       })
//       .catch(err => {
//         console.error("Error connecting to mongo", err);
//       });
//   }, 1000);
// };

// const connection1 = connectionDB(serverL1, dbName);
// const connection2 = connectionDB(serverL2, dbName);

const connectionDB1 = {
  connect: mongoose.createConnection(`mongodb://${serverL1}/${dbName}`, console.log("Connected to Mongo 1")),
  primary: true
};

const connectionDB2 = {
    connect: mongoose.createConnection(`mongodb://${serverL2}/${dbName}`, console.log("Connected to Mongo 2")),
    primary: false
};

const getConnection = () => {
  if (connectionDB1.primary) {
    return connectionDB1;
  } else {
    return connectionDB2;
  }
};

module.exports = getConnection;
