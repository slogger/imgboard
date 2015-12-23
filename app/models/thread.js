const co = require('co');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Thread = new mongoose.Schema({
    title: {type: String, require: true},
    board: {type: String, require: true},
    last_update: Date
});

Thread.methods.setLastUpdateByMessage = function(message) {
    this.last_update = message._id.getTimestamp();
};

module.exports = mongoose.model('Thread', Thread);
