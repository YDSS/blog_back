import express from 'express';

const router = express.Router();
const articleAction = require('../actions/article');
const responseState = require('../constant/state_code');

router.get('/find', (req, res, next) => {
    const findArticle = articleAction.findArticle;

    findArticle(req.query)
        .then(ret => {
            res.send({
                errno: responseState.OK,
                data: ret
            });
        }, err => {
            res.send({
                errno: responseState.SQL_ERROR,
                data: err.message
            });
        });
});

router.post('/add', (req, res, next) => {
    const addArticle = articleAction.addArticle;
    let raw = decodeURIComponent(req.body.raw);

    addArticle(raw)
        .then(ret => {
            res.send({
                errno: responseState.OK,
                data: ret
            });
        },
        err => {
            res.send({
                errno: responseState.SQL_ERROR,
                data: err.message
            });
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
                data: err.message
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
                data: err.message
            });
        });
});

export {router as article};
