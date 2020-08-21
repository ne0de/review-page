module.exports = (sequelize, Sequelize) => {
    const Games = sequelize.define("games",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            developer: Sequelize.STRING,
            release: Sequelize.DATE,
            genre: Sequelize.STRING,
            languague: Sequelize.STRING,
            coop: Sequelize.BOOLEAN,
            description: Sequelize.TEXT,
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            dislikes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            image: {
                type: Sequelize.STRING,
                defaultValue: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_568656.png&f=1&nofb=1"   
            }
        }
    );
  return Games;
};
//2020-08-18 13:28:02