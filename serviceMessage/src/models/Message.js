const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const database = require("../database/database")


const messageSchema = new Schema(
  {
    destination: { type: String, required: true},
    body: { type: String, required: true },
    status:{type: String, enum:["Send","Pending","Timeout","Rejected"]},
    messageId:{type: String}
  },
  {
    timestamps: {
      createdAt: "created_at",
    }
  }
);

module.exports = (dbKey) => database.get(dbKey).model("Message", messageSchema)
