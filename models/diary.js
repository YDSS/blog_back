module.exports = (sequelize, Datatype) => { 
    return sequelize.define('Diary', {
        id: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        // 日期的字符串形式，格式为'yyyy-mm-dd'，作为日记的唯一标识
        dateString: { type: Datatype.STRING, allowNull: false, unique: true },
        title: { type: Datatype.STRING, allowNull: false },
        // markdown语法的全文,不包括标题
        content: { type: Datatype.TEXT, allowNull: false },
        year: { type: Datatype.INTEGER, allowNull: false },
        month: { type: Datatype.INTEGER, allowNull: false },
        day: { type: Datatype.INTEGER, allowNull: false },
        createdAt: { type: Datatype.DATE, allowNull: false },
        updatedAt: { type: Datatype.DATE, allowNull: false, defaultValue: Datatype.NOW }
    }, {
        timestamps: false,
        tableName: 'diary'
    });
}
