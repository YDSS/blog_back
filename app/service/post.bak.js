'use strict';

module.exports = {};
// const sequelize = require('../db/instance');
// const Post = sequelize.import('../model/post');
//
// const postQueryFields = [
//     'id',
//     'title',
//     'content',
//     'summary',
//     'tags',
//     'raw',
//     'createdAt',
//     'updatedAt'
// ];
/**
 * 通过id取单个post
 * @param {number|string} id
 */
// exports.getPostById = function* (id) {
    // id = +id;
    //
    // if (Number.isNaN(id)) {
    //     throw new TypeError('id should be a number or number like string');
    // }
    //
    // return yield Post.findOne({
    //     where: {
    //         id: id
    //     },
    //     attributes: postQueryFields
    // });
// }

// exports.findArticle = function (data) {
//         // 操作数据库后sequelize返回的promise对象
//         let promise;
//         // 取article表中的字段
//         data.queryItem = [
//             'id',
//             'title',
//             'content',
//             'summary',
//             'tags',
//             'raw',
//             'createdAt',
//             'updatedAt'
//         ];
//
//         switch (data.type) {
//             case 'pagination':
//                 promise = findArticleByPage(data);
//                 break;
//             case 'id':
//                 promise = findArticleById(data);
//                 break;
//             case 'tags':
//                 promise = findArticleByTags(data);
//                 break;
//             default:
//                 return null;
//         }
//
//         promise
//             .then(res => {
//                 resolve(res);
//             })
//             .catch(err => {
//                 reject(err);
//             });
// }

// function findArticleByPage(data) {
//     return Promise.all([
//         getArticlesByPage(data),
//         getArticleSum()
//     ])
//         .then(res => {
//             let list = res[0];
//             /**
//              * getArticleSum返回的是一个数组，其数据结构如下：
//              *  res: [
//              *      [...list],
//              *      [{
//              *          dataValues: {
//              *              articleSum: 20
//              *          }
//              *      }]
//              *  ]
//              */
//             // TODO sequelize返回的对象里东西太多，查查api有没简化的方法
//             let articleSum = res[1][0].dataValues.articleSum;
//
//             return {
//                 list,
//                 articleSum
//             };
//         });
// }
//
// function getArticlesByPage(data) {
//     return Article.findAll({
//         attributes: data.queryItem,
//         order: 'updatedAt DESC',
//         limit: data.pageSize,
//         // 前端页码从1开始计数
//         offset: (data.curPage - 1) * data.pageSize
//     })
// }
//
// function getArticleSum() {
//     return Article.findAll({
//         attributes: [[
//             // 聚合id，得到文章总数
//             sequelize.fn('COUNT', sequelize.col('id')),
//             // 重命名为articleSum
//             'articleSum'
//         ]]
//     });
// }
//
// function findArticleById(data) {
//     return Article.findOne({
//         where: {
//             id: data.id
//         },
//         attributes: data.queryItem
//     });
// }
//
// function findArticleByTags(data) {
//     // TODO
}

// exports.addArticle = function (raw) {
//     return new Promise((resolve, reject) => {
//         let parsed = Util.parseRaw(raw);
//         // 如果没有标题或者标题格式不对，直接返回
//         if (!parsed) {
//             reject('wrong format of title or summary...');
//             return;
//         }
//         let {title, content, summary} = parsed;
//
//         Article
//             .build({
//                 title: title,
//                 summary: summary,
//                 content: content,
//                 raw: raw,
//                 createdAt: new Date()
//             })
//             .save()
//             .then(anoterTask => {
//                 resolve(anoterTask);
//             })
//             .catch(err => {
//                 reject(err);
//             });
//     });
// }
//
// /**
//  * 更新文章
//  *
//  * @param {object} data
//  * @property {number} data.id 文章ID
//  * @property {string} data.raw 文章内容
//  * @property {Date} data.updatedAt 更新时间
//  *
//  * @exports
//  */
// exports.updateArticle = function (data) {
//     return new Promise((resolve, reject) => {
//         let {id, raw, updatedAt} = data;
//         let parsed = Util.parseRaw(raw);
//         // 如果没有标题或者标题格式不对，直接返回
//         if (!parsed) {
//             reject('wrong format of title or summary...');
//             return;
//         }
//
//         let {title, content, summary} = parsed;
//         Article
//             .findOne({
//                 where: {
//                     id
//                 }
//             })
//             .then(article => {
//                 let ret = article.update({
//                     title,
//                     raw,
//                     summary,
//                     content,
//                     updatedAt
//                 });
//                 resolve(ret);
//             })
//             .catch(err => {
//                 reject(err);
//             });
//     });
// }
//
// exports.delArticle = function (id) {
//     return new Promise((resolve, reject) => {
//         Article
//             .findOne({
//                 where: {
//                     id: id
//                 }
//             })
//             .then(article => {
//                 let ret = article.destroy();
//                 resolve(ret);
//             })
//             .catch(err => {
//                 reject(err);
//             });
//     });
// }
