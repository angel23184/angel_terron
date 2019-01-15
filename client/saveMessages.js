const Message = require("../models/Message");

const saveMessages = (constructor, destination, body, status, confirm) => {
  const newMessage = new constructor({
    destination,
    body,
    status,
    confirm
  });

  return newMessage.save()
};


module.exports = saveMessages;
