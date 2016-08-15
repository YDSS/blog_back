'use strict';

const sequelize = require('../db/instance');
const User = sequelize.import('../model/user');

exports.getUsers = function* () {
    return yield User.findAll({
        attributes: ['id', 'name']
    });
};
