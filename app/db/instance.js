const Sequelize = require('sequelize');
const conf = require('./conf');

module.exports = new Sequelize(
    conf.database,
    conf.user,
    conf.passwd,
    {
        host: conf.host,
        port: conf.port,
        dialect: conf.dialect,
        pool: conf.pool
    }
);
