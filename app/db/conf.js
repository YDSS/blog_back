const env = process.env['NODE_ENV'];
const isDev = env === 'development';

module.exports = {
    database: isDev ? 'blog' : 're4u4ps68yj7rpp7',
    user: isDev ? 'ydss' : 're4u4ps68yj7rpp7',
    passwd: isDev ? '3300376' : 'yds3300376yd',
    host: isDev ? 'localhost' : 'rds77vzyugy0ev8i4rbt.mysql.rds.aliyuncs.com',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};
