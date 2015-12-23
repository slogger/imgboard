var env = process.env;

var config = {
    HOST: env.HOST || 'http://localhost',
    PORT: env.PORT || 5001,
    MONGODB_URL: env.MONGODB_URL || 'mongodb://localhost:27017/3ch'
};

module.exports = config;