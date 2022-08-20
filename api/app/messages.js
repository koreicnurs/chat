const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = fileDb.getMessages();
    res.send(messages);
});

router.post('/', (req, res) => {
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({error: 'Data not valid'});
    }

    fileDb.addMessage({
        author: req.body.author,
        message: req.body.message,
    });

    res.send('Create');
});

module.exports = router;