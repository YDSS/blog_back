import express from 'express';
import sequelize from '../db/connectMysql';

let router = express.Router();

let User = sequelize.import('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
    User.findOne({
        attributes: ['id', 'name']
    })
        .then(user => {
            res.send('user name: ' + user.name);
        });
});

export { router as users };
