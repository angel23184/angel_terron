const Message = require("../models/Message");

const getMessages = res => {
    Message.find()
      .then(messages => {
        res.status(200).json({ messages });
      })
      .catch(err => {
        res.status(500).json({ message: "Cannot get the messages. Try again" });
      });
  };
  

  module.exports = getMessages;
  