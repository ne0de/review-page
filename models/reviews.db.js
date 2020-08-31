module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: Sequelize.STRING,
            description: Sequelize.STRING,
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            dislikes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        },{
            freezeTableName: true,
        }   
    );
  return Review;
};
