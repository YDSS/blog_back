/**
 * @file diary api
 * @author YDSS
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const thunkify = require('thunkify');
const readFile = thunkify(fs.readFile);

const DiaryService = require('../../service/diary');
const Result = require('../../util/result');
const ErrCode = require('../../constant/err_code');
const Util = require('../../util/utils');
const is = require('is-type-of');
/**
 * form表单中文件的name
 * @type {String}
 */
const fileField = 'file';

exports.upload = function* uploadDiaryController() {
    let result = new Result();
    let multipart = this.request.body;

    try {
        if (!multipart.files) {
            Result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'file uploaded should not missing'
            });

            return this.body = result.getModel();
        }
        // 多个文件
        if (is.array(multipart.files[fileField])
            && multipart.files[fileField].length) {
            let formFiles = multipart.files[fileField];
            let files = formFiles.map(file => {
                let content = fs.readFileSync(file.path).toString();
                return {
                    name: file.name,
                    content: content
                };
            });
            let ret = yield DiaryService.uploadMultipleFiles(files);
            result.data = ret;
        }
        // 单个文件
        else {
            let file = multipart.files.file;
            let content = fs.readFileSync(file.path).toString();

            let ret = yield DiaryService.uploadSingleFile({
                name: file.name,
                content: content
            });
            result.data = ret;
        }
    }
    catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err);
    }

    this.body = result.getModel();
    // _delTmpDir(1);
};

let _delTmpDir = (function () {
    /**
     * 上次执行的时间
     * @type {Date}
     */
    let time = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    /**
     * 清理上传文件的临时目录
     *   默认路径为os.tmpDir，因为koa-body默认的临时目录为os.tmpDir
     *   默认每隔一天删除一次
     *
     * @param  {string?} dirpath 临时文件夹绝对路径
     * @param {number?} interval 删除操作的执行间隔，单位为ms
     */
    return function _delTmpDir(dirpath, interval) {
        // 一个参数都没传
        if (!dirpath) dirpath = os.tmpDir();
        // 传了interval
        if (is.number(dirpath)) {
            interval = dirpath;
            dirpath = os.tmpDir();
        }

        let shouldRmDir = false;
        let now = Date.now();
        interval = (!interval || !is.number(interval))
            ? DAY
            : interval;
        if (now - time > interval) {
            shouldRmDir = true;
        }

        if (shouldRmDir) {
            time = now;
            fs.rmdirSync(dirpath);
        }
    };

})();

exports.getDiaryByDate = function* getDiaryByDateController() {
    let result = new Result();

    try {
        let dateString = this.params.dateString;
        if (!dateString) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'missing dateString'
            });
            return this.body = result.getModel();
        }

        let ret = yield DiaryService.getDiaryByDate(dateString);

        result.data = ret || `diary ${dateString} not found`;
    }
    catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err);
    }

    this.body = result.getModel();
};

exports.updateDiary = function* updateDiaryController () {
    let result = new Result();

    try {
        let dateString = this.params.dateString;
        if (!dateString) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'missing dateString'
            });
            return this.body = result.getModel();
        }

        let form = this.request.body;
        let content = form.content;
        /**
         * update支持修改updatedDate字段
         * @type {Date}
         */
        let updatedDate = form.date;

        let success = yield DiaryService.updateDiary(dateString, content, updatedDate);
        if (success) {
            result.data = true;
        }
        else {
            result.addError({
                errCode: ErrCode.UPDATE_DIARY_FAIL,
                errMsg: 'update diary failed'
            });
            console.error(`update diary ${dateString} failed`);
        }
    } catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err.stack);
    }

    this.body = result.getModel();
};

exports.getDiariesByMonth = function* getDiariesByMonthController() {
    let result = new Result();

    try {
        let query = this.query;
        let year = +query.year;
        let month = +query.month;

        if (!is.number(year) || !is.number(month)) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'missing year or month'
            });
            return this.body = result.getModel();
        }

        let ret = yield DiaryService.getDiariesByMonth(year, month);
        result.data = ret;
    }
    catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err.stack);
    }

    this.body = result.getModel();
};

exports.getLatestDiaryByMonth = function* getLatestDiaryByMonthController() {
    let result = new Result();

    try {
        let query = this.query;
        let year = +query.year;
        let month = +query.month;

        let diary = yield DiaryService.getLatestDiaryByMonth(year, month);
        result.data = diary;
    }
    catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err.stack);
    }

    this.body = result.getModel()
};
