const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = fileDb.getMessages();
    const date = req.query.datetime;
    const queryArray = [];
    if(date) {
        messages.map(m => {
            if(m.datetime > date) {
                return queryArray.push(m)
            }
        });
        return res.send(queryArray)
    }
    res.send(messages.slice(-30));
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