const locks = require("locks");
const mutex = locks.createMutex();

const saveCredit = (credit, amount) => {
  return credit.find().then(credits => {
    if (credits.length === 0) {
      const newCredit = new credit({
        amount
      });

      return newCredit
        .save()
        .then(() => {
          console.log({ message: "Credit succesfully saved" });
        })
        .catch(err => {
          console.log({ message: "Impossible to charge Credit" });
        });
    } else {
      credits[0]
        .update({  amount  })
        .then(() => {
          console.log({ message: "Credit Update OK" });
        })
        .catch(() => {
          console.log({ message: "Credit Update KO" });
        });
    }
  });
};

module.exports = saveCredit;
