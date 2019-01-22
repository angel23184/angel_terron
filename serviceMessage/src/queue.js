var Queue = require("bull");
const PORT = "6379";
const HOST = "127.0.0.1";
const uuidv1 = require("uuid/v1");
const sendMessage = require("./controllers/sendMessage");
const messageValidation = require("./validations/messageValidation");
const saveMessage = require("./client/saveMessages");
const Message = require("./models/Message");
const messagePrimary = Message();
const messageReplica = Message("replica");

var messageQueue = new Queue("message queue", `redis://${HOST}:${PORT}`);

const addMessageToQueue = (req, res) => {
  const { destination, body } = req.body;
  const messageId = uuidv1();
  const objectKeys = Object.keys(req.body);

  saveMessage(messagePrimary, destination, body, "Pending", messageId).catch(
    error => console.log(error)
  );
  saveMessage(messageReplica, destination, body, "Pending", messageId).catch(
    error => console.log(error)
  );

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
    sendMessage(destination, body, messageId)
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  } else {
    done();
  }
});

module.exports = addMessageToQueue;
