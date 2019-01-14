const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditSchema = new Schema(
  {
    amount: { type: Number, required: true, default:"0"},
  },
  {
    timestamps: {
      createdAt: "created_at",
    }
  }
);

const Credit = mongoose.model("Credit", creditSchema);
module.exports = Credit;