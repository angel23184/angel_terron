const { Credit1, Credit2 } = require("../models/Credit");
const locks = require("locks");
const mutex = locks.createMutex();

const saveCredit = (model, amount, res) => {
  return model.find().then(credits => {
    if (credits.length === 0) {
      const newModel = new model({
        amount
      });

      return newModel
        .save()
        .then(() => {
          res.status(200).json({ message: "Credit succesfully saved" });
          mutex.unlock();
        })
        .catch(err => {
          res.status(400).json({ message: "Impossible to charge Credit" });
          mutex.locks();
        });
    } else {
      credits[0]
        .update({ $inc: { amount } })
        .then(() => {
          res.status(200).json({ message: "Credit Update OK" });
          mutex.unlock();
        })
        .catch(() => {
          res.status(500).json({ message: "Credit Update KO" });
          mutex.unlock();
        });
    }
  });
};

module.exports = saveCredit;
