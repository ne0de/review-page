const Sequelize = require("sequelize");
const dbConfig = require("../config/config.js");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./Users-db")(sequelize, Sequelize);

module.exports = db;
