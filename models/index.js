const Sequelize = require("sequelize");
const dbConfig = require("../config/config.js");
const userReviewsDb = require("./userReviews.db.js");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./users.db")(sequelize, Sequelize);
db.Review = require("./reviews.db")(sequelize, Sequelize);
db.UserReview = require("./userReviews.db")(sequelize, Sequelize);

module.exports = db;
