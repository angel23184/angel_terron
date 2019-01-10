const axios = require('axios');
const PORT = 3000;
const SERVER_NAME = "angel_terron_messageapp_1";
const saveMessage = require("./persistentMessages")

const sendMessage = (destination, body, res) =>{
    const URL = `http://${SERVER_NAME}:${PORT}/message`;
    axios.post(URL, {
        destination,
        body
      })
      .then(() =>{
        saveMessage(destination, body)
         res.status(200).json({message:"OK"})
      })
      .catch(() =>{
        res.status(500).json({message: "An error occurs. Please try again"})
      });
}

  module.exports = sendMessage;
