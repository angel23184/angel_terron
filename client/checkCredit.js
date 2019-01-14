const Credit = require("../models/Credit");

const checkCredit = res => {
  Credit.find()
    .then(credit => {
        console.log(credit[0].amount,"1")
      if (!credit.length || credit.amount<1) {
        console.log(credit[0]._doc, "2")
        res.status(200).json({ Message: "insufficient credit. Please insert coin" });
        return false;
      }
      console.log(credit.amount, "3")
      return true;
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot get the credit. Try again" });
    });
};

module.exports = checkCredit;
