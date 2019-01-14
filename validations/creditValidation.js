
const creditValidation = () => {
  
    if (destination === "" || body === "") {
      res.status(400).json({ message: "Empty fields are not allowed" });
      return false;
    } else if (objectKeys[0] !== "destination") {
      res.status(400).json({ message: "First param must be destination" });
      return false;
    } else if (objectKeys[1] !== "body") {
      res.status(400).json({ message: "Second param mut be body" });
      return false;
    } else if (objectKeys.length !== 2) {
      res.status(400).json({ message: "You must add 2 parameters " });
      return false;
    } else if (destination.length > 140 && body.length > 140) {
      res.status(400).json({ message: "Please, respect 140 characters" });
      return false;
    } else if (typeof destination !== "string" || typeof body !== "string") {
      res.status(400).json({ message: "Only strings are allowed" });
      return false;
    }
    return true;
  };
  
  module.exports = creditValidation;