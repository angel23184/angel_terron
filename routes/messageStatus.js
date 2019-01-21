const express = require("express");
const router = express.Router();
const getMessages = require("../client/getMessages");

router.get("/:messageId/status", (req, res) => {
  const { messageId } = req.params;
  getMessages(res, messageId);
});

module.exports = router;
