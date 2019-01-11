const express = require("express");
const router = express.Router();
const sendMessage = require("../controllers/sendMessage");
const getMessages = require("../client/getMessages");
const messageValidation = require ("../validations/messageValidation");

router.post("/", (req, res) => {
  const { destination, body } = req.body;
  if (messageValidation(destination, body, req, res)) {
    sendMessage(destination, body, res);
  }
});

router.get("/getmessages", (req, res) => {
  getMessages(res);
});

module.exports = router;
