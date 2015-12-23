const co = require('co');
const Router = require('koa-router');

const Thread = require('../models/thread');

var threadsRouter = new Router({prefix: '/api/threads'});
threadsRouter.get('/', co.wrap(function*(ctx) {
    var sort = {_id: -1};
    var filter = {};
    var limit = parseInt(ctx.query.limit) || 10;
    if (ctx.request.query.hasOwnProperty('recent')) {
        sort = {last_update: -1};
    }
    if (ctx.request.query.board) {
        filter.board = ctx.request.query.board;
    }
    var threads = yield Thread
        .find().sort(sort)
        .limit(limit).lean().exec();
    ctx.body = threads;
}));

threadsRouter.post('/', co.wrap(function*(ctx) {
    var threadConfig = ctx.request.body;
    var newThread = new Thread(threadConfig);
    yield newThread.save();
    ctx.body = newThread.toObject();
}));

module.exports = threadsRouter;
