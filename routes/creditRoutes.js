const express = require("express");
const router = express.Router();
const saveCredit = require("../client/saveCredit");
const {Credit1, Credit2} = require("../models/Credit")

router.post("/", (req, res) => {
  const { amount } = req.body;
  saveCredit(Credit1, amount, res)
});

module.exports = router;
