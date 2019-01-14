const express = require("express");
const router = express.Router();
const saveCredit = require("../client/saveCredit");
const locks = require("locks");
const mutex = locks.createMutex();

router.post("/", (req, res) => {
  const { amount } = req.body;
  mutex.locks(saveCredit(amount, res));
});

module.exports = router;
