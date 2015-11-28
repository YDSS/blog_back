'use strict'

const express = require('express');
const router = express.Router();
const articleAction = require('../actions/article');
const responseState = require('../constant/state_code');

router.get('/add', (req, res, next) => {
    const addArticle = articleAction.addArticle;
    let content = req.query.content;

    addArticle(content)
        .then(ret => {
            res.send({
                errno: responseState.OK,
                data: ret
            });
        },
        err => {
            res.send({
                errno: responseState.SQL_ERROR,
                errInfo: err
            });
            throw err;
        });
});

router.get('/update', (req, res, next) => {
    const updateArticle = articleAction.updateArticle;
    let id = req.query.id;
    let content = req.query.content;

    updateArticle({
        id: id,
        content: content
    })
        .then(ret => {
            res.send({
                errno: responseState.OK,
                data: ret
            });
        }, err => {
            res.send({
                errno: responseState.SQL_ERROR,
                data: err
            });
        });
});

router.get('/del', (req, res, next) => {
    const delArticle = articleAction.delArticle;
    let articleId = req.query.id;
    
    delArticle(articleId)
        .then(ret => {
            res.send({
                errno: responseState.OK,
                data: ret
            });
        }, err => {
            res.send({
                errno: responseState.SQL_ERROR,
                data: err
            });
        });
});

module.exports = router;
