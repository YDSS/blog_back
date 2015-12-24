// const Sequelize = require('sequelize');
import Sequelize from 'sequelize';
import conf from './conf';

let sequelize = new Sequelize(
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

export default sequelize;
