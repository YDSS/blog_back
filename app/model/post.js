/**
 * @file post table model
 * @author YDSS
 */
'use strict';

module.exports = (sequelize, Datatype) => {
    return sequelize.define('Post', {
        id: {type: Datatype.INTEGER, primaryKey: true, autoIncrement: true},
        // markdown语法的全文
        raw: {type: Datatype.TEXT, allowNull: false},
        // 解析之后取到的文章标题
        title: {type: Datatype.STRING, allowNull: false, unique: true},
        // 除去title的正文内容
        content: {type: Datatype.STRING},
        // 解析之后取到的文章摘要
        summary: {type: Datatype.STRING},
        tags: {type: Datatype.STRING},
        createdAt: {type: Datatype.DATE, allowNull: false},
        updatedAt: {type: Datatype.DATE, allowNull: false, defaultValue: Datatype.NOW}
    }, {
        timestamps: false,
        tableName: 'post'
    });
};
