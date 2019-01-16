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

const sendMessage = (destination, body, res) => {
  const URL = `http://${SERVER_NAME}:${PORT}/message`;
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
      saveMessages(messagePrimary, destination, body, true, true)
        .then(() => {
          saveMessages(messageReplica, destination, body, true, true)
            .then(() => {
              res.status(200).json({ message: "OK" });
            })
            .cacth(() => {
              res.status(400).json({ message: "KO" });
            });
        })
        .catch(err => {
          console.log("An error occurs saving your message. Please try again");
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
        saveMessages(messagePrimary, destination, body, true, false)
          .then(() => {
            saveMessages(messageReplica, destination, body, true, true);
            res.status(500).json({
              message: "Message is sent but no answer. Please try again"
            });
          })
          .catch(err => {
            console.log(
              "An error occurs saving your message. Please try again"
            );
          });
      } else {
        saveMessages(messagePrimary, destination, body, false, false).then(
          () => {
            saveMessages(messageReplica, destination, body, true, true);

            res
              .status(500)
              .json({ message: "An error occurs. Please try again" });
          }
        );
      }
    });
};

module.exports = sendMessage;
