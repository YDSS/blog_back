/**
 * @file blog posts api
 * @author YDSS
 */
'use strict';

const PostService = require('../../service/post');
const Result = require('../../util/result');
const ErrCode = require('../../constant/err_code');
const Util = require('../../util/utils');

const isNaN = Number.isNaN;

exports.getPostById = function* getPostById() {
    let result = new Result();

    try {
        let id = +this.params.id;

        if (isNaN(id)) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: `these params id may not right`
            });

            return this.body = result.getModel();
        }

        let post = yield PostService.getPostById(id);
        result.data = post || null;
    }
    catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err.stack);
    }

    this.body = result.getModel();
};

exports.getPostsByPage = function* getPostsByPage() {
    let result = new Result();

    try {
        let curPage = +this.query.curPage;
        let pageSize = +this.query.pageSize;

        if (isNaN(curPage) || isNaN(pageSize)) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: `these params curPage, pageSize may not right`
            });

            return this.body = result.getModel();
        }

        let ret = yield PostService.getPostsByPage(curPage, pageSize);
        result.data = ret;
    }
    catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err);
    }

    this.body = result.getModel();
};

exports.addPost = function* addPost() {
    let result = new Result();

    try {
        let raw = decodeURIComponent(this.request.body.raw);
        let parsed = Util.parseRaw(raw);
        // 如果没有标题或者标题格式不对，直接返回
        if (!parsed) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'format of raw may not correct'
            });

            return this.body = result.getModel();
        }

        let ret = yield PostService.addPost(parsed, raw);
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

exports.delPost = function* delPost() {
    let result = new Result();

    try {
        let id = +this.params.id;

        if (isNaN(id)) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'id may not right'
            });
            return this.body = result.getModel();
        }

        let ret = yield PostService.delPost(id);
        result.data = ret;
    } catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err.stack);
    }

    this.body = result.getModel();
}

exports.updatePost = function* updatePost() {
    let result = new Result();

    try {
        let id = +this.params.id;

        if (isNaN(id)) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: `the param: id may not right`
            });

            return this.body = result.getModel();
        }

        // 检查格式
        let raw = decodeURIComponent(this.request.body.raw);
        let parsed = Util.parseRaw(raw);
        if (!parsed) {
            result.addError({
                errCode: ErrCode.CLIENT_PARAM_ERROR,
                errMsg: 'format of raw may not correct'
            });

            return this.body = result.getModel();
        }

        let ret = yield PostService.updatePost(id, parsed, raw);
        result.data = ret;
    } catch (err) {
        result.addError({
            errCode: ErrCode.SQL_ERROR
        });
        console.error(err.stack);
    }

    this.body = result.getModel();
}

// router.post('/update', (req, res, next) => {
//     const updateArticle = articleAction.updateArticle;
//     let {id, raw, updatedAt} = req.body;
//     raw = decodeURIComponent(raw);
//
//     updateArticle({
//         id,
//         raw,
//         updatedAt
//     })
//         .then(ret => {
//             res.send({
//                 errno: responseState.OK,
//                 data: ret
//             });
//         }, err => {
//             res.send({
//                 errno: responseState.SQL_ERROR,
//                 data: err.message
//             });
//         });
// });
//
// router.get('/del', (req, res, next) => {
//     const delArticle = articleAction.delArticle;
//     let articleId = req.query.id;
//
//     delArticle(articleId)
//         .then(ret => {
//             res.send({
//                 errno: responseState.OK,
//                 data: ret
//             });
//         }, err => {
//             res.send({
//                 errno: responseState.SQL_ERROR,
//                 data: err.message
//             });
//         });
// });
//
// export {router as article};
