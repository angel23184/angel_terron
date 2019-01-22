const Message = require("../models/Message");

const getMessages = (res, options = {}) => {
  console.log(options)
    Message().find({messageId: options})
      .then(messages => {
        const messageStatus = messages[0].status;
        res.status(200).json({messageStatus});
      })
      .catch(err => {
        res.status(500).json({ message: "Cannot get the messages. Try again" });
      });
  };
  

  module.exports = getMessages;
  