const db = {
    database: 'blog',
    user: 'ydss',
    passwd: '3300376',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}

exports.db = db;
