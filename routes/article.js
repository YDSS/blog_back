'use strict'

const express = require('express');
const router = express.Router();
const addArticleAction = require('../actions/article/addArticle');

router.get('/add', (req, res, next) => {
    let content = req.query.content;
    addArticleAction(content)
        .then(ret => {
            console.log(ret); 
        },
        err => {
            throw err;
        });
});

module.exports = router;
