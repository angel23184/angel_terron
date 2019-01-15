const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getConnection = require("../database/database")
const connection = getConnection();
const connectionStart = connection.connect;
console.log("Estoy en el modelo Message")

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

const Message = connectionStart.model("Message", messageSchema);
module.exports = Message;
