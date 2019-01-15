const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connectionsObject = require("../database/database")
const connectionDB1 = connectionsObject.connectionDB1.connect;
const connectionDB2 = connectionsObject.connectionDB2.connect;

const messageSchema = new Schema(
  {
    destination: { type: String, required: true},
    body: { type: String, required: true },
    status:{type: Boolean},
    confirm:{type: Boolean}
  },
  {
    timestamps: {
      createdAt: "created_at",
    }
  }
);

const Message1 = connectionDB1.model("Message", messageSchema);
const Message2 = connectionDB2.model("Message", messageSchema);

module.exports = {Message1, Message2};
