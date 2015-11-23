'use strict'

const Sequelize = require('sequelize');

let dbConfig = require('./conf').db;
let sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.passwd,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool
    }
);

module.exports = sequelize;
