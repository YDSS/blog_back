'use strict';

const UserSerivce = require('../../service/user');
const Result = require('../../util/result');
const ErrCode = require('../../constant/err_code');

exports.index = function* () {
    let result = new Result();

    try {
        let users = yield UserSerivce.getUsers();
        result.data = users;
    } catch (e) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });

        console.info('[UserSerivce getUsers error]');
        console.error(e);
    }

    this.body = result.getModel();
};
