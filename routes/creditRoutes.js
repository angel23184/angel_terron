const express = require("express");
const router = express.Router();
const saveCredit = require("../client/saveCredit");
const { Credit1, Credit2 } = require("../models/Credit");

router.post("/", (req, res) => {
  const { amount } = req.body;
  saveCredit(Credit1, amount, res)
  .then(() => {
    saveCredit(Credit2, amount, res);
  })
  .catch(()=>{
    res.status(400).json({message: "There was a problem saving credit"})
  })
});

module.exports = router;
