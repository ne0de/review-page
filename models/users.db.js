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
            description: Sequelize.STRING,
            avatar: {
                type: Sequelize.STRING,
                defaultValue: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_568656.png&f=1&nofb=1"   
            }
        },
        {
            freezeTableName: true
        }
    );
  return User;
};
