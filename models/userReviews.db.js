module.exports = (sequelize, Sequelize) => {
    const UserReview = sequelize.define("user_review",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reviewId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'review', 
                    key: 'id',
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'user', 
                    key: 'id',
                }
            },
        },
        {
            freezeTableName: true,
        }
    );
  return UserReview;
};
