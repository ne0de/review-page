module.exports = (sequelize, Sequelize) => {
    const RateReview = sequelize.define("rate_review",
        { 
            type: {
                type: Sequelize.STRING,
                defaultValue: 'nothing'
            },
        },{
            freezeTableName: true,
            timestamps: false
        }
    );
  return RateReview;
};