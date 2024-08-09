const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config.development.url, {
  dialect: "postgres",
});

const Strategy = require("./strategy")(sequelize, Sequelize);

const db = {
  Strategy,
  sequelize,
  Sequelize,
};

module.exports = db;
