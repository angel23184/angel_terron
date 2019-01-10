const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
