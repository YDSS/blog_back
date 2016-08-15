'use strict';

const fs = require('fs');
const path = require('path');

const co = require('co');
const router = require('koa-router')();
const Util = require('./util/utils');

co(function* () {
    try {
        const controllers = yield Util.traverseDir(path.join(__dirname, './controller'));

        router.get('/', controllers.home.index);
        // ajax api
        const api = controllers.api;
        /**
         * user api
         */
        const userApiPrefix = '/user';
        router.get('user', userApiPrefix, api.user.index);
        /**
         * post api
         */
        const postApiPrefix = '/post';
        // 通过id取post
        router.get('post', `${postApiPrefix}/:id`, api.post.getPostById);
        // 分页取post
        router.get('post', postApiPrefix, api.post.getPostsByPage);
        // 新增post
        router.put('post', postApiPrefix, api.post.addPost);
        // 删除post
        router.del('post', `${postApiPrefix}/:id`, api.post.delPost);
        // 更新post
        router.post('post', `${postApiPrefix}/:id`, api.post.updatePost);
    }
    catch (err) {
        console.log(err.stack);
    }
});

module.exports = router;
