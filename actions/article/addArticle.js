'use strict'

const Article = require('../../models/article');
const getTitleAndAbs = require('../../util/util.js').getTitleAndAbs;

function addArticleAction(raw) {
    return new Promise((resolve, reject) => {
        let analyzed = getTitleAndAbs(raw);
        let title = analyzed.title;
        let abs = analyzed.abs;

        Article
            .build({
                title: title,
                summary: abs, 
                content: raw
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

module.exports = addArticleAction;
