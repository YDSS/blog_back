'use strict'

const sequelize = require('../db/connectMysql');
const Article = sequelize.import('../models/article');
const getTitleAndAbs = require('../util/util.js').getTitleAndAbs;

exports.findArticle = function (data) {
    return  new Promise((resolve, reject) => {
        let promise;
        let queryItem = [
            'id',
            'title',
            'summary',
            'tags',
            'created_at'
        ];

        // 查询条件视请求参数的组合决定
        // 有id则以id为查询条件，
        // 若无id则查看是否存在tags，
        // 若id和tags皆无，则取全部
        if (data.id) {
            promise = Article.findOne({
                where: {
                    id: data.id
                },
                attributes: queryItem
            });
        }
        else if (data.tags) {
            
        }
        else {
            promise = Article.findAll({
                attributes: queryItem 
            });
        }

        promise
            .then(article => {
                resolve(article);
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.addArticle = function (raw) {
    return new Promise((resolve, reject) => {
        let analyzed = getTitleAndAbs(raw);
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
                content: raw,
                created_at: new Date().getTime()
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
        let analyzed = getTitleAndAbs(data.content);
        let title = analyzed.title;
        let abs = analyzed.abs;
        debugger

        Article
            .findOne({
                where: {
                    id: data.id
                }
            })
            .then(article => {
                debugger
                let ret = article.update({
                    title: title,
                    content: data.content,
                    summary: abs
                });
                resolve(ret);
            })
            .catch(err => {
                debugger
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
