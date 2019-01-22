const Credit = require("../models/Credit")


const creditValidation = () => {
  console.log("Estoy en creditValidation")
  const creditPrimary = Credit()
  const creditReplica = Credit("replica")

  return creditPrimary.find()
  .then(credits => {
    console.log(credits)
    if (credits.length === 0 && credits[0].amount < 1 ) {
      console.log({ message: "Not money enough" });
      return false;
    } else {
      return true;
    }
  });
};

module.exports = creditValidation;
