const Message = require("./models/Message");

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

const getMessages = res => {
  Message.find()
    .then(messages => {
      res.status(200).json({ messages });
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot get the messages. Try again" });
    });
};

const functionsMessages = { saveMessages, getMessages };
module.exports = functionsMessages;
