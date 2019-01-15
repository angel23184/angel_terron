const express = require("express");
const router = express.Router();
const saveCredit = require("../client/saveCredit");

router.post("/", (req, res) => {
  const { amount } = req.body;
  saveCredit(amount, res);
});

module.exports = router;
