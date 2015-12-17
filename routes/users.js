'use strict'

let express = require('express');
let router = express.Router();

const Sequelize = require('sequelize');
const sequelize = require('../db/connectMysql');
let User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    name: Sequelize.STRING,
    pass: Sequelize.STRING
}, {
    tableName: 'user'
});

/* GET users listing. */
router.get('/', (req, res, next) => {
    User.findOne({
        attributes: ['id', 'name']
    })
        .then(user => {
            res.send('user name: ' + user.name);
        });
});

module.exports = router;
