'use strict';
const debug = require('debug');
debug.enable('app:error:*,app:*:main');

function getLogger(loggerName) {
    // info
    const infoLogger = debug('app:info:' + loggerName);
    infoLogger.color = debug.colors[3];  //'dodgerblue'
    infoLogger.log = console.info.bind(console);
    // warning
    const wanrLogger = debug('app:warn:' + loggerName);
    wanrLogger.color = debug.colors[2];  //'goldenrod'
    wanrLogger.log = console.warn.bind(console);
    // error
    const errorLogger = debug('app:error:' + loggerName);
    errorLogger.log = console.error.bind(console);
    errorLogger.color = debug.colors[5];  // 'crimson'
    // proto
    const protoLogger = debug('app:proto:' + loggerName);
    protoLogger.log = console.info.bind(console);
    protoLogger.color = debug.colors[0];  // 'lightseagreen'
    return {
        info: infoLogger,
        warn: wanrLogger,
        error: errorLogger,
        proto: protoLogger
    };
};

module.exports = getLogger;
