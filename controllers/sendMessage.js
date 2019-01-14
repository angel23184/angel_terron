const axios = require("axios");
const PORT = 3000;
// const SERVER_NAME = "angel_terron_messageapp_1";
const SERVER_NAME = "localhost";
const saveMessages = require("../client/saveMessages");
const creditValidation = require("../validations/creditValidation");


const sendMessage = (destination, body, res) => {
const URL = `http://${SERVER_NAME}:${PORT}/message`;
if(creditValidation)
  axios
    .post(
      URL,
      {
        destination,
        body
      },
      { timeout: 10000 }
    )
    .then(() => {
      saveMessages(destination, body, true, true)
      res.status(200).json({ message: "OK" });
      //restar pasta
    })
    .catch(error => {
      if (error.response === undefined) {
        saveMessages(destination, body, true, false);
        res.status(500).json({ message: "Message is sent but no answer. Please try again" });

      } else {
        res.status(500).json({ message: "An error occurs. Please try again" });
        saveMessages(destination, body, false, false);
      }
    });
};

module.exports = sendMessage;
