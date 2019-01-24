const Queue = require("bull");
const PORT = "6379";
const HOST = "127.0.0.1";
const creditQueue = new Queue("credit queue", `redis://${HOST}:${PORT}`);
const messageQueue = new Queue("message queue", `redis://${HOST}:${PORT}`);
const messageValidation = require("./validations/messageValidation");
const saveMessage = require("./client/saveMessages");
const uuidv1 = require("uuid/v1");
const Message = require("./models/Message.js");
const primaryMessage = Message();
const secondaryMessage = Message("replica");
const sendMessage = require("./controllers/sendMessage");

const addMessageToQueue = (req, res) => {
  const { destination, body } = req.body;
  const objectKeys = Object.keys(req.body);
  const messageId = uuidv1();
  if (messageValidation(destination, body, objectKeys)) {
    saveMessage(primaryMessage, destination, body, "Pending", messageId);
    saveMessage(secondaryMessage, destination, body, "Pending", messageId);
    res.send(messageId);
    creditQueue.add({ message: "Ok", destination, body, messageId });
  } else {
    res.send("Your message is not correct. Please try again");
  }
};

//Separar messageQueue y llevarlo a app.js y llamarlo desde allí
messageQueue.process((job, done) => {
  if (job.data.credit_validation === "Ok") {
    const { destination, body, messageId } = job.data;
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
