var Queue = require("bull");
const PORT = "6379";
const HOST = "127.0.0.1";
const messageQueue = new Queue("message queue", `redis://${HOST}:${PORT}`);
const creditQueue = new Queue("credit queue", `redis://${HOST}:${PORT}`);
const creditValidation = require("./validations/creditValidation");
const Credit = require("./models/Credit");
const creditPrimary = Credit();
const creditSecondary = Credit("replica");
const saveCredit = require("./client/saveCredit");

creditQueue.process((job, done) => {
  const { destination, body, messageId } = job.data;
  if (job.data.message === "Ok") {
    creditValidation()
      .then(res => {
        if (res) {
          creditPrimary.find().then(credits => {
            const amountDiscount = credits[0].amount - 1;
            saveCredit(creditPrimary, amountDiscount)
              .then(() => {
                saveCredit(creditSecondary, amountDiscount).then(() => {
                  messageQueue.add({
                    credit_validation: "Ok",
                    destination,
                    body,
                    messageId
                  });
                });
              })
              .catch(err => {
                console.log(err);
                messageQueue.add({ credit_validation: "Fail" });
              });
          });
        } else {
          messageQueue.add({ credit_validation: "Fail" });
        }
      })
      .catch(() => {
        messageQueue.add({ credit_validation: "Fail" });
      });
  }
  done();
});

const addCreditToQueue = (req, res) => {};
