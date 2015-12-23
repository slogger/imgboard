const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Message = new mongoose.Schema({
    thread: {type: ObjectId, ref: 'Board', required: true},
    reply: {type: ObjectId, ref: 'Message'},
    autor: {type: String, required: true},
    text: {type: String, required: true},
    pictures: [String]
});

module.exports = mongoose.model('Message', Message);
