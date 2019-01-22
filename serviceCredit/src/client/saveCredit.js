const locks = require("locks");
const mutex = locks.createMutex();

const saveCredit = (credit, amount, res) => {
  return credit.find().then(credits => {
    if (credits.length === 0) {
      const newCredit = new credit({
        amount
      });

      return newCredit
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
