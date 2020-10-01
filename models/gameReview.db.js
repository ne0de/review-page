module.exports = (sequelize) => {
    const GameReview = sequelize.define("game_review",
        {   },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
  return GameReview;
};