const express = require('express');
const router  = express.Router();
const sendMessage = require('./utils');

router.post('/', (req, res) =>{
    // console.log(req.body)
    const { destination, body} = req.body;
    sendMessage(destination, body, res);
})


module.exports = router;