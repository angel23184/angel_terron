const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connectionsObject = require("../database/database")
const connectionDB1 = connectionsObject.connectionDB1.connect;
const connectionDB2 = connectionsObject.connectionDB2.connect;

const creditSchema = new Schema(
  {
    amount: { type: Number, default:1},
  },
  {
    timestamps: {
      createdAt: "created_at",
    }
  }
);

const Credit1 = connectionDB1.model("Credit", creditSchema);
const Credit2 = connectionDB2.model("Credit", creditSchema);
module.exports = {Credit1, Credit2};
