const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getConnection = require("../database/database")
const connection = getConnection();
const connectionStart = connection.connect;

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

const Credit = connectionStart.model("Credit", creditSchema);
module.exports = Credit;