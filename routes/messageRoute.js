const express = require("express");
const router = express.Router();
const addMessageToQueue = require("../queue");
const getMessages = require("../client/getMessages");



router.post("/", (req, res) => {
  addMessageToQueue(req, res);
});

router.get("/getmessages", (req, res) => {
  getMessages(res);
});

module.exports = router;
