'use strict'

const Sequelize = require('sequelize');
// database object that has connected
const sequelize = require('../db/connectMysql');

module.exports = (sequelize, Datatype) => { 
    return sequelize.define('Article', {
        id: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Datatype.STRING, allowNull: false, unique: true },
        content: { type: Datatype.STRING, allowNull: false },
        summary: { type: Datatype.STRING }, 
        tags: { type: Datatype.STRING },
        created_at: { type: Datatype.DATE, allowNull: false },
        updated_at: { type: Datatype.DATE, allowNull: false, defaultValue: Datatype.NOW }
    }, {
        timestamps: false,
        tableName: 'article'
    });
}
