module.exports = (sequelize, Datatype) => {
    return sequelize.define('User', {
        id: { type: Datatype.INTEGER, primaryKey: true },
        name: Datatype.STRING,
        pass: Datatype.STRING
    }, {
        tableName: 'user'
    });
};
