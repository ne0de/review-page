module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true
    }
    );
    return User;
};