const axios = require('axios');

const sendMessage = (destination, body, res) =>{
    const URL = 'http://exercise-1_messageapp_1:3000/message'
    axios.post(URL, {
        destination,
        body
      })
      .then(() =>{
        res.status(200).json({message:"OK"})
      })
      .catch(() =>{
        res.status(500).json({message: "KO"})
      });
}

  module.exports = sendMessage;
