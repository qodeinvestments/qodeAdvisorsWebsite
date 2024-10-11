const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config.development.url, {
  dialect: "postgres",
});

const Strategy = require("./strategy")(sequelize, Sequelize);
const Email = require('./email')(sequelize, Sequelize.DataTypes);
const db = {
  Strategy,
  Email,
  sequelize,
  Sequelize,
};

module.exports = db;
