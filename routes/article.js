'use strict'

const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', (req, res, next) => {
    Article
        .build({
            title: 'test',
            content: 'hahaha',
            tag: 'node,sequelize,mysql'
        })
        .save()
        .then(anotherTask => {
            console.log(anotherTask);
            res.send('save succeed!');
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;
