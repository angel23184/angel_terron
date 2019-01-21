const axios = require("axios");
const PORT = 3000;
//const SERVER_NAME = "angel_terron_messageapp_1";
const SERVER_NAME = "localhost";
const saveMessages = require("../client/saveMessages");
const Message = require("../models/Message");
const messagePrimary = Message();
const messageReplica = Message("replica");
const Credit = require("../models/Credit");
const creditPrimary = Credit();

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
      saveMessages(messagePrimary, destination, body, "send")
        .then(() => {
          saveMessages(messageReplica, destination, body, "send")
            .then(() => {
              console.log({ message: "OK" });
            })
            .catch(() => {
              console.log({ message: "KO" });
            });
        })
        .catch(err => {
          console.log("Errorrrrr");
          console.log("An error occurs. Please try again" + err);
        });
      creditPrimary
        .find()
        .then(credits => {
          const newAmount = (credits[0].amount -= 1);
          const _id = credits[0]._id;

          creditPrimary
            .findByIdAndUpdate(_id, { amount: newAmount })
            .then(credits => {
              console.log(`Substract correctly`);
            })
            .catch(() => {
              console.log(`Substract incorrectly`);
            });
        })
        .catch(() => {
          console.log("There was a problem in your balance. Please try again");
        });
    })
    .catch(error => {
      if (error.response === undefined) {
        console.log("sendMessage Timeout");
        saveMessages(
          messagePrimary,
          destination,
          body,
          "not sending.Timeout",
          false
        )
          .then(() => {
            saveMessages(
              messageReplica,
              destination,
              body,
              "not sending. Timeout",
              true
            );
            console.log({
              message: "Message is sent but no answer. Please try again"
            });
          })
          .catch(err => {
            console.log("An error occurs with your message. Please try again");
          });
      } else {
        saveMessages(
          messagePrimary,
          destination,
          body,
          "not sending",
          false
        ).then(() => {
          saveMessages(messageReplica, destination, body, "not sending");

          console.log({ message: "Error. Please try again" });
        });
      }
    });
};

module.exports = sendMessage;
