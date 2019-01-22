var Queue = require("bull");
const PORT = "6379";
const HOST = "127.0.0.1";
const uuidv1 = require("uuid/v1");
const sendMessage = require("./controllers/sendMessage");
const messageValidation = require("./validations/messageValidation");
const creditValidation = require("./validations/creditValidation");
const saveMessage = require("./client/saveMessages");
const Message = require("./models/Message");
const messagePrimary = Message();
const messageReplica = Message("replica");

var messageQueue = new Queue("message queue", `redis://${HOST}:${PORT}`);

const addMessageToQueue = (req, res) => {
  const { destination, body } = req.body;
  const messageId = uuidv1();
  const objectKeys = Object.keys(req.body);
  console.log(messageId + "/////////////////////////////////");
  saveMessage(messagePrimary, destination, body, "Peding", messageId);
  saveMessage(messageReplica, destination, body, "Peding", messageId);

  messageQueue
    .add({ destination, body, messageId, objectKeys })
    .then(() => {
      res.status(200).json({ message: messageId });
    })
    .catch(() => {
      res.status(500).json({ message: messageId });
    });
};

//Separar messageQueue y llevarlo a app.js y llamarlo desde allí
messageQueue.process(function(job, done) {
  const { destination, body, messageId, objectKeys } = job.data;
  if (messageValidation(destination, body, messageId, objectKeys)) {
    creditValidation().then(response => {
      if (response) {
        sendMessage(destination, body, messageId).then(() => {
          done();
        });
      } else {
        done();
      }
    });
  } else {
    done();
  }
});

module.exports = addMessageToQueue;
