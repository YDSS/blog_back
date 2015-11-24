'use strict'

const Sequelize = require('sequelize');
// database object that has connected
const sequelize = require('../db/connectMysql');

let Article = sequelize.define('Article', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    title: { type: Sequelize.STRING, allowNull: false, unique: true },
    content: { type: Sequelize.STRING },
    tag: { type: Sequelize.STRING },
    create_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    update_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    timestamps: false,
    tableName: 'article'
});

module.exports = Article;
