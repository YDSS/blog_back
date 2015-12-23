// let app = require('../app');
// 工作环境 production或development
// let nodeEnv = app.get('env');
let nodeEnv = 'production';
let isDev = nodeEnv === 'development';

const db = {
    database: isDev ? 'blog' : 're4u4ps68yj7rpp7',
    user: isDev ? 'ydss' : 're4u4ps68yj7rpp7',
    passwd: isDev ? '3300376' : '',
    host: isDev ? 'localhost' : 'rds77vzyugy0ev8i4rbt.mysql.rds.aliyuncs.com',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}

exports.db = db;
