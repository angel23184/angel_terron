const express = require('express');
const router  = express.Router();
const sendMessage = require('./messageClient');

router.post('/', (req, res) =>{
    const { destination, body} = req.body;
    sendMessage(destination, body, res);
})

module.exports = router;