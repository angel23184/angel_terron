const Message = require("./models/Message");

const saveMessages = (destination, body, res) => {
  const newMessage = new Message({
    destination,
    body
  });

  newMessage
    .save()
    .then(() => {
      res.status(200).json({ message: "Message succesfully saved" });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "An error occurs saving your message. Please try again",
          err: err
        });
    });
};

module.exports = saveMessages;
