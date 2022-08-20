const express = require('express');
const messages = require('./app/messages');
const fileDb = require('./fileDb');
const cors = require('cors');

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());

app.use('/messages', messages);

fileDb.init();
app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});