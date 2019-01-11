const Message = require("../models/Message");

const saveMessages = (destination, body, status, confirm) => {
  const newMessage = new Message({
    destination,
    body,
    status,
    confirm
  });

  newMessage.save()
    .then(() => {
      console.log("Message succesfully saved");
    })
    .catch(err => {
      console.log("An error occurs saving your message. Please try again");
    });
};


module.exports = saveMessages;
