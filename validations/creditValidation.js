const Credit = require("../models/Credit")


const creditValidation = res => {
  return Credit.find().then(credits => {
    if (credits[0].amount < 1 && credits.length === 0) {
      res.status(400).json({ message: "Not money enough" });
      return false;
    } else {
      return true;
    }
  });
};

module.exports = creditValidation;
