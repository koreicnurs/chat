const { nanoid } = require('nanoid');
const fs = require('fs');

const filename = './db.json';
let data = [];

module.exports = {
    init() {
        try {
            const fileContents = fs.readFileSync(filename);
            data = JSON.parse(fileContents);
        } catch (e) {
            data = [];
        }
    },
    getMessages() {
        return data;
    },
    addMessage(message) {
        message.id = nanoid();
        message.datetime = (new Date().toISOString());
        data.push(message);
        this.save();
    },
    save() {
        fs.writeFileSync(filename, JSON.stringify(data));
    }
};