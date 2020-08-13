module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nickname: Sequelize.STRING,
            password: Sequelize.STRING,
        },
        {
            freezeTableName: true,
        }
    );
  return User;
};
