const co = require('co');
const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('./config');
const requireDir = require('require-dir');
const convert = require('koa-convert');

const log = require('./logger')('main');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// Template
var hbs = require('koa-hbs');
app.use(convert(hbs.middleware({
    viewPath: __dirname + '/public',
    disableCache: true
})));

const serve = require('koa-static');
app.use(serve(__dirname + '/public'), {defer: true});

const routers = requireDir('./app/controllers');
const modulesNames = Object.keys(routers);
modulesNames.forEach(function(moduleName) {
    var router = routers[moduleName];
    app.use(router.routes());
    app.use(router.allowedMethods());
});
log.info('setup routers: ', modulesNames);

// start server
setupDB = function() {
    if (mongoose.connection.db) return;
    mongoose.connect(
        config.MONGODB_URL,
        (err) => {if (err) log.error(err)}
    );
}
if (!module.parent) {
    setupDB();
    app.listen(config.PORT, () => log.info('Server listening on ' + config.PORT));
}

const Router = require('koa-router');
const rootRouter = new Router();

rootRouter.get('/', co.wrap(function*(ctx) {
    yield ctx.render('index');
}));
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
module.exports = {app: app, setupDB: setupDB}
