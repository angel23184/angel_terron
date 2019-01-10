const axios = require("axios");
const PORT = 3000;
const SERVER_NAME = "angel_terron_messageapp_1";
const functionsMessages = require("./persistentMessages");

const sendMessage = (destination, body, res) => {
  const URL = `http://${SERVER_NAME}:${PORT}/message`;

  axios
    .post(
      URL,
      {
        destination,
        body
      },
      { timeout: 500 }
    )
    .then(() => {
      res.status(200).json({ message: "OK" });
      functionsMessages.saveMessages(destination, body, true, true);
    })
    .catch(error => {
      if (error.response === undefined) {
        functionsMessages.saveMessages(destination, body, true, false);
        res.status(500).json({ message: "Message is sent but no answer. Please try again" });

      } else {
        res.status(500).json({ message: "An error occurs. Please try again" });
        functionsMessages.saveMessages(destination, body, false, false);
      }
    });
};

module.exports = sendMessage;
