const axios = require('axios');
const PORT = 3000;
const SERVER_NAME = "exercise-1_messageapp_1";

const sendMessage = (destination, body, res) =>{
    const URL = `http://${SERVER_NAME}:${PORT}/message`;
    axios.post(URL, {
        destination,
        body
      })
      .then(() =>{
        res.status(200).json({message:"OK"})
      })
      .catch(() =>{
        res.status(500).json({message: "An error occurs. Please try again"})
      });
}

  module.exports = sendMessage;
