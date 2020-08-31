module.exports = (sequelize, Sequelize) => {
    const GameReview = sequelize.define("game_review",
        {   },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
  return GameReview;
};