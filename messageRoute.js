const express = require("express");
const router = express.Router();
const sendMessage = require("./messageClient");

router.post("/", (req, res) => {
  const { destination, body } = req.body;
  const objectKeys = Object.keys(req.body);

  if (destination === "" || body === "") {
    res.status(400).json({ message: "Empty fields not allowed" });
  } else if (
    !objectkeys ||
    objectKeys[0] !== "destination" ||
    objectKeys[1] !== "body" ||
    objectKeys.length !== 2
  ) {
    res
      .status(400)
      .json({ message: "Parameters must be destination and body" });
  } else if (!objectKeys[0].length <= 140 && !objectKeys[1].length <= 140) {
    res.status(400).json({ message: "Please, rrespect 140 characters" });
  } else if (typeof destination !== "string" || typeof body !== "string"
  ) {
    res.status(400).json({ message: "Only strings are allowed" });
  } else {
    sendMessage(destination, body, res);
  }
});

module.exports = router;
