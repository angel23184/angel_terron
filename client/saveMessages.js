const saveMessages = (message, destination, body, status, confirm) => {
  const newMessage = new message({
    destination,
    body,
    status,
    confirm
  });

  return newMessage.save()
};


module.exports = saveMessages;
