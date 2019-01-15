const {Credit1} = require("../models/Credit");

const checkCredit = res => {
  return Credit1.find()
    .then(credit => {
      if (credit.length === 0 || credit[0].amount < 1) {
        res
          .status(200)
          .json({ Message: "insufficient credit. Please insert coin" });
        return false;
      }
      return true;
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot get the credit. Try again" });
    });
};

module.exports = checkCredit;
