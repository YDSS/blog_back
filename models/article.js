module.exports = (sequelize, Datatype) => { 
    return sequelize.define('Article', {
        id: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Datatype.STRING, allowNull: false, unique: true },
        raw: { type: Datatype.TEXT, allowNull: false },
        summary: { type: Datatype.STRING }, 
        tags: { type: Datatype.STRING },
        createdAt: { type: Datatype.DATE, allowNull: false },
        updatedAt: { type: Datatype.DATE, allowNull: false, defaultValue: Datatype.NOW }
    }, {
        timestamps: false,
        tableName: 'article'
    });
}
