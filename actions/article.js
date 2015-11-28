'use strict'

const sequelize = require('../db/connectMysql');
const Article = sequelize.import('../models/article');
const getTitleAndAbs = require('../util/util.js').getTitleAndAbs;

exports.addArticle = function (raw) {
    return new Promise((resolve, reject) => {
        let analyzed = getTitleAndAbs(raw);
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
