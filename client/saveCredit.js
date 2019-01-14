const Credit = require("../models/Credit");

const saveCredit = (amount, res) => {
  Credit.find().then(credits => {
    if (credits.length === 0) {
      const newCredit = new Credit({
        amount
      });

      return newCredit
        .save()
        .then(() => {
          res.status(200).json({ message: "Credit succesfully saved" });
        })
        .catch(err => {
          res.status(400).json({ message: "Impossible to charge Credit" });
        });
    } else {
      credits[0]
        .update({ $inc: { amount } })
        .then(() => {
          res.status(200).json({ message: "Credit Update OK" });
        })
        .catch(() => {
          res.status(500).json({ message: "Credit Update KO" });
        });
    }
  });
};

module.exports = saveCredit;
