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
        /**
         * diary api
         */
        const diaryApiPrefix = '/diary';
        // 上传日记，新增或修改
        router.post('diary', diaryApiPrefix, api.diary.upload);
        // 通过dateString查找diary
        router.get('diary', `${diaryApiPrefix}/:dateString`, api.diary.getDiaryByDate);
        // 通过年月查找diaries
        router.get('diary', `${diaryApiPrefix}/bymonth`, api.diary.getDiariesByMonth);
        // 通过年月查找最新的一篇diary
        router.get('diary', `${diaryApiPrefix}/latest`, api.diary.getLatestDiaryByMonth);
        // 更新diary
        router.post('diary', `${diaryApiPrefix}/:dateString`, api.diary.updateDiary);
    }
    catch (err) {
        console.log(err.stack);
    }
});

module.exports = router;
