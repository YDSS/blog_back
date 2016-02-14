import sequelize from '../db/connectMysql';
import Util from '../util/util';

let Article = sequelize.import('../models/article');

exports.findArticle = function (data) {
    return new Promise((resolve, reject) => {
        // 操作数据库后sequelize返回的promise对象
        let promise;
        // 取article表中的字段
        data.queryItem = [
            'id',
            'title',
            'summary',
            'tags',
            'raw',
            'createdAt',
            'updatedAt'
        ];

        switch (data.type) {
            case 'pagination':
                promise = findArticleByPage(data);
                break;
            case 'id':
                promise = findArticleById(data);
                break;
            case 'tags':
                promise = findArticleByTags(data);
                break;
            default:
                return null;
        }

        promise
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function findArticleByPage(data) {
    return Promise.all([
        getArticlesByPage(data),
        getArticleSum()
    ])
        .then(res => {
            let list = res[0];
            /**
             * getArticleSum返回的是一个数组，其数据结构如下：
             *  res: [
             *      [...list],
             *      [{
             *          dataValues: {
             *              articleSum: 20
             *          }
             *      }]
             *  ]
             */
            // TODO sequelize返回的对象里东西太多，查查api有没简化的方法
            let articleSum = res[1][0].dataValues.articleSum;

            return {
                list,
                articleSum
            };
        });
}

function getArticlesByPage(data) {
    return Article.findAll({
        attributes: data.queryItem,
        order: 'createdAt DESC',
        limit: data.pageSize,
        // 前端页码从1开始计数
        offset: (data.curPage - 1) * data.pageSize
    })
}

function getArticleSum() {
    return Article.findAll({
        attributes: [[
            // 聚合id，得到文章总数
            sequelize.fn('COUNT', sequelize.col('id')),
            // 重命名为articleSum
            'articleSum'
        ]]
    });
}

function findArticleById(data) {
    return Article.findOne({
        where: {
            id: data.id
        },
        attributes: data.queryItem
    });
}

function findArticleByTags(data) {
    // TODO
}

exports.addArticle = function (raw) {
    return new Promise((resolve, reject) => {
        let analyzed = Util.getTitleAndAbs(raw);
        // 如果没有标题或者标题格式不对，直接返回
        if (!analyzed) {
            reject('wrong format of title or summary...');
            return;
        }

        let title = analyzed.title;
        let abs = analyzed.abs;

        Article
            .build({
                title: title,
                summary: abs,
                raw: raw,
                createdAt: new Date()
            })
            .save()
            .then(anoterTask => {
                resolve(anoterTask);
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.updateArticle = function (data) {
    return new Promise((resolve, reject) => {
        let analyzed = Util.getTitleAndAbs(data.content);
        let title = analyzed.title;
        let abs = analyzed.abs;

        Article
            .findOne({
                where: {
                    id: data.id
                }
            })
            .then(article => {
                let ret = article.update({
                    title: title,
                    raw: data.raw,
                    summary: abs,
                    updatedAt: new Date()
                });
                resolve(ret);
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.delArticle = function (id) {
    return new Promise((resolve, reject) => {
        Article
            .findOne({
                where: {
                    id: id
                }
            })
            .then(article => {
                let ret = article.destroy();
                resolve(ret);
            })
            .catch(err => {
                reject(err);
            });
    });
}
