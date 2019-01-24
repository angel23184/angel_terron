const axios = require("axios");
const PORT = 3000;
//const SERVER_NAME = "angel_terron_messageapp_1";
const SERVER_NAME = "localhost";
const Message = require("../models/Message");
const messagePrimary = Message();
const messageReplica = Message("replica");

const sendMessage = (destination, body, messageId) => {
  const URL = `http://${SERVER_NAME}:${PORT}/message`;
  return axios
    .post(
      URL,
      {
        destination,
        body,
        messageId
      },
      { timeout: 10000 }
    )
    .then(() => {
      console.log("sendMessage Save");
      messagePrimary
        .findOneAndUpdate({ messageId }, { status: "Send" })
        .then(() => {
          messageReplica
            .findOneAndUpdate({ messageId }, { status: "Send" })
            .then(() => {
              console.log({ message: "OK" });
            })
            .catch(() => {
              console.log({ message: "KO" });
            });
        })
        .catch(err => {
          console.log("An error occurs. Please try again" + err);
        });
    })
    .catch(error => {
      if (error.response === undefined) {
        console.log("sendMessage Timeout");
        messagePrimary
          .findOneAndUpdate({ messageId }, { status: "Timeout" })
          .then(() => {
            messageReplica.findOneAndUpdate(
              { messageId },
              { status: "Timeout" }
            );
            console.log({
              message: "Message is sent but no answer. Please try again"
            });
          })
          .catch(err => {
            console.log("An error occurs with your message. Please try again");
          });
      } else {
        messagePrimary
          .findOneAndUpdate({ messageId }, { status: "Rejected" })
          .then(() => {
            messageReplica.findOneAndUpdate(
              { messageId },
              { status: "Rejected" }
            );

            console.log({ message: "Error. Please try again" });
          });
      }
    });
};

module.exports = sendMessage;
