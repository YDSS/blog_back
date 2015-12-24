// 环境变量, ACE的设置方式略有差异
let nodeEnv = process.env.NODE_ENV;
let isDev = nodeEnv === 'development';

const conf = {
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
}

export default conf;
