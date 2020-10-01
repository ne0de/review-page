const Sequelize = require("sequelize");
const dbConfig = require("../config/config.js");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Tables */
db.User = require("./users.db") (sequelize, Sequelize);
db.Games = require("./games.db") (sequelize, Sequelize);
db.Review = require("./reviews.db") (sequelize, Sequelize);

/* Intermediate tables */
db.UserReview = require("./userReviews.db") (sequelize, Sequelize);
db.GameReview = require("./gameReview.db") (sequelize, Sequelize);
db.rateReview = require("./rateReview.db") (sequelize, Sequelize);

/* User <-> Review relation */
db.User.belongsToMany(db.Review, {
    through: db.UserReview,
    as: "reviews",
    foreignKey: "userId",
  });
  
db.Review.belongsToMany(db.User, {
    through: db.UserReview,
    as: "users",
    foreignKey: "reviewId",
});

/* Game <-> Review relation */
db.Games.belongsToMany(db.Review, {
    through: db.GameReview,
    as: "reviews",
    foreignKey: "gameId",
  });
  
db.Review.belongsToMany(db.Games, {
    through: db.GameReview,
    as: "games",
    foreignKey: "reviewId",
});

/* User <-> Rate review relation */
db.User.belongsToMany(db.Review, {
    through: db.rateReview,
    as: "reviews_rate",
    foreignKey: "userId",
});
  
db.Review.belongsToMany(db.User, {
    through: db.rateReview,
    as: "users_rate",
    foreignKey: "reviewId",
});

module.exports = db;
