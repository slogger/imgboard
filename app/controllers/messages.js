const co = require('co');
const Router = require('koa-router');

const Thread = require('../models/thread');
const Message = require('../models/message');

var messagesRouter = new Router({prefix: '/api/messages'});
messagesRouter.get('/:thread', co.wrap(function*(ctx) {
    var threads =  yield Thread.find().limit(10).lean();
    ctx.body = threads;
}));

messagesRouter.post('/:thread', co.wrap(function*(ctx) {
    var threadId = ctx.params.thread;
    var currentThread = yield Thread.findOne({_id: threadId});
    if (!currentThread) {
        ctx.status = 404;
        return;
    }
    var messageConfig = ctx.request.body;
    messageConfig.thread = currentThread._id;
    var newMessage = new Message(messageConfig);
    yield newMessage.save();
    currentThread.setLastUpdateByMessage(newMessage);
    yield currentThread.save();
    ctx.body = newMessage.toObject();
}));

module.exports = messagesRouter;
