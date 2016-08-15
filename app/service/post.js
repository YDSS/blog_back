'use strict';

const sequelize = require('../db/instance');
const Post = sequelize.import('../model/post');

const postQueryFields = [
    'id',
    'title',
    'content',
    'summary',
    'tags',
    'raw',
    'createdAt',
    'updatedAt'
];
/**
 * 通过id取单个post
 * @param {number|string} id
 */
exports.getPostById = function* (id) {
    id = +id;

    if (Number.isNaN(id)) {
        throw new TypeError('id should be a number or number like string');
    }

    return yield Post.findById(id, {
        attributes: postQueryFields
    });
}

/**
 * 分页取post
 * @param {number} pageSize 每页的条数
 * @param {number} curPage 当前页码
 *
 * @return {Object}
 *   - {Array} posts 取到的分页post
 *   - {number} sum 总条数
 */
exports.getPostsByPage = function* (curPage, pageSize) {
    let postsByPage = yield Post.findAll({
        attributes: postQueryFields,
        order: 'updatedAt DESC',
        limit: pageSize,
        // 前端页码从1开始计数
        offset: (curPage - 1) * pageSize
    });
    let sum = yield getPostSum();

    return {
        posts: postsByPage,
        sum: sum
    };
};

/**
 * 取post总条数
 * @return {number}
 */
function* getPostSum () {
    return yield Post.count();
};
exports.getPostSum = getPostSum;

/**
 * 新增post
 * @param {Object} parsed 已解析好的文章
 *   - {string} title 标题
 *   - {string} summary 摘要
 *   - {string} content 正文
 * @param {string} 原始的markdown字符串
 * @return
 */
exports.addPost = function* (parsed, raw) {
    let ret = yield Post.build({
        title: parsed.title,
        summary: parsed.summary,
        content: parsed.content,
        raw: raw,
        createdAt: new Date()
    })
    .save();

    return ret;
};

/**
 * 删除post
 * @param  {number} id post id
 * @return {boolean}    是否成功
 */
exports.delPost = function* (id) {
    // 成功则返回1，失败返回0
    return yield !!Post.destroy({
        where: {
            id: id
        }
    });
};

exports.updatePost = function* (id, parsed, raw) {
    let ret = yield Post.update({
        title: parsed.title,
        summary: parsed.summary,
        content: parsed.content,
        raw: raw,
        updatedAt: new Date()
    }, {
        where: {
            id: id
        }
    });

    // 成功则返回[1]，失败返回[0]
    return !!ret[0];
};
