const saveMessages = (message, destination, body, status, messageId) => {
  const newMessage = new message({
    destination,
    body,
    status,
    messageId
  });

  return newMessage.save()
};


module.exports = saveMessages;
