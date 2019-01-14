const  Credit = require("../models/Credit");

const checkCredit = res => {
    Credit.findOneAndUpdate()
      .then(credit => {
        res.status(200).json({ credit });
      })
      .catch(err => {
        res.status(500).json({ message: "Cannot get the credit. Try again" });
      });
  };
  

  module.exports = checkCredit;