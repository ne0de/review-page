const Sequelize = require("sequelize");
const dbConfig = require("../config/config.js");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./users.db")(sequelize, Sequelize);
db.Review = require("./reviews.db")(sequelize, Sequelize);
db.UserReview = require("./userReviews.db")(sequelize, Sequelize);
db.Games = require("./Games.db")(sequelize, Sequelize);

module.exports = db;
