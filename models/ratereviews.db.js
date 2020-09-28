module.exports = (sequelize, Sequelize) => {
    const RateReview = sequelize.define("rate_review",
        {   },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
  return RateReview;
};