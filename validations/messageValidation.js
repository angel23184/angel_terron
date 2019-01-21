const messageValidation = (destination, body, messageId, objectKeys) => {
  console.log("Estoy en message validation");

  if (destination === "" || body === "") {
    console.log({ message: "Empty fields are not allowed" });
    return false;
  } else if (objectKeys[0] !== "destination") {
    console.log({ message: "First param must be destination" });
    return false;
  } else if (objectKeys[1] !== "body") {
    console.log({ message: "Second param mut be body" });
    return false;
  } else if (objectKeys.length !== 2) {
    console.log({ message: "You must add 2 parameters " });
    return false;
  } else if (destination.length > 140 && body.length > 140) {
    console.log({ message: "Please, respect 140 characters" });
    return false;
  } else if (typeof destination !== "string" || typeof body !== "string") {
    console.log({ message: "Only strings are allowed" });
    return false;
  } else if (objectKeys === "") {
    console.log({ message: "objectKeys is empty" });
    return false;
  } else if (messageId === "") {
    console.log({ message: "messageId is empty" });
    return false;
  }
  return true;
};

module.exports = messageValidation;
