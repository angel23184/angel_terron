const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const database = require("../database/database");

const creditSchema = new Schema(
  {
    amount: { type: Number, default: 1 }
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

module.exports = (dbKey) => database.get(dbKey).model("Credit", creditSchema);
