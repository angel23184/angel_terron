const express = require("express");
const router = express.Router();
const sendMessage = require("./messageClient");
const functionsMessages = require("./persistentMessages");

router.post("/", (req, res) => {
  const { destination, body } = req.body;
  const objectKeys = Object.keys(req.body);

  if (destination === "" || body === "") {
    res.status(400).json({ message: "Empty fields are not allowed" });
  } else if (objectKeys[0] !== "destination") {
    res.status(400).json({ message: "First param must be destination" });
  } else if (objectKeys[1] !== "body") {
    res.status(400).json({ message: "Second param mut be body" });
  } else if (objectKeys.length !== 2) {
    res.status(400).json({ message: "You must add 2 parameters " });
  } else if (destination.length > 140 && body.length > 140) {
    res.status(400).json({ message: "Please, respect 140 characters" });
  } else if (typeof destination !== "string" || typeof body !== "string") {
    res.status(400).json({ message: "Only strings are allowed" });
  } else {
    sendMessage(destination, body, res);
    functionsMessages.saveMessages(res);
  }
});

router.get("/getmessages", (req, res) => {
  functionsMessages.getMessages(res);
});

module.exports = router;
