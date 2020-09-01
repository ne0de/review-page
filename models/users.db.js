module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            surname: Sequelize.STRING,
            nickname: Sequelize.STRING,
            password: Sequelize.STRING,
            email: Sequelize.STRING,
            description: Sequelize.TEXT('long'),
            avatar: {
                type: Sequelize.STRING,
                defaultValue: "https://uechantal.edu.ec/assets/img/avatar.png"   
            }
        },
        {
            freezeTableName: true
        }
    );
  return User;
};
