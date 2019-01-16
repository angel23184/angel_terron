const express = require("express");
const router = express.Router();
const saveCredit = require("../client/saveCredit");
const Credit = require("../models/Credit");
const creditPrimary = Credit()
const creditReplica = Credit("replica")

router.post("/", (req, res) => {
  const { amount } = req.body;

  saveCredit(creditPrimary, amount, res)
  .then(() => {
    saveCredit(creditReplica, amount, res);
  })
  .catch(()=>{
    res.status(400).json({message: "There was a problem saving credit"})
  })
});

module.exports = router;
