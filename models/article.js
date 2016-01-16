module.exports = (sequelize, Datatype) => { 
    return sequelize.define('Article', {
        id: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        // 解析之后取到的文章标题
        title: { type: Datatype.STRING, allowNull: false, unique: true },
        // markdown语法的全文
        raw: { type: Datatype.TEXT, allowNull: false },
        // 解析之后取到的文章摘要
        summary: { type: Datatype.STRING }, 
        tags: { type: Datatype.STRING },
        createdAt: { type: Datatype.DATE, allowNull: false },
        updatedAt: { type: Datatype.DATE, allowNull: false, defaultValue: Datatype.NOW }
    }, {
        timestamps: false,
        tableName: 'article'
    });
}
