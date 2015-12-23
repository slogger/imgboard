const mongoose = require('mongoose');

const config = require('../config');
const mongooseUrl = config.MONGODB_URL + '-test';
const clearDB  = require('mocha-mongoose')(mongooseUrl);
const prepare = require('mocha-prepare');

prepare(function (done) {
    mongoose.connect(mongooseUrl, done);
});
