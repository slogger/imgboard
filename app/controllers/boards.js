const Router = require('koa-router');
const boards = require('../models/board-config');

var boardsRouter = new Router({prefix: '/api/boards'});
boardsRouter.get('/', (ctx, next) => ctx.body = boards);

module.exports = boardsRouter;
