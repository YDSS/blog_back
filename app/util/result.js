'use strict';

/**
 * 规范向前端吐出数据的格式，格式如下
 * 	- 返回结果正常时，返回
 * 		{
 * 			success: true,
 * 			data: xxx
 * 		}
 * 	- 返回结果异常时，返回
 * 		{
 * 			success: false,
 * 			errCode: {number},
 * 			errMsg: {string?}
 * 		}
 *
 * @class
 */
class Result {
    /**
     * @property {boolean} success 返回结果是否正常
     * @property {*?} data 正常时返回的结果
     * @property {number?} errCode 后端定义的错误码，具体参见@link constant/err_code.js
     * @property {errMsg?} errMsg 需要前端展示的错误信息
     */
    constructor() {
        this.success = true;
    }

    /**
     * 在返回结果中添加错误信息，此操作会导致success变化
     * @param {Object} param
     *   - {number} errCode 错误码
     *   - {string?} errMsg 错误信息
     */
    addError(param) {
        this.success = false;
        this.errCode = param.errCode;
        if (param.errMsg) {
            this.errMsg = param.errMsg;
        }
    }

    /**
     * 获取处理后的返回结果
     * @return {[type]} [description]
     */
    getModel() {
        let model = {
            success: this.success
        };

        if (!this.success) {
            model.errCode = this.errCode;
            model.errMsg = this.errMsg || '';
        }
        else {
            model.data = this.data;
        }

        return model;
    }
}

module.exports = Result;
