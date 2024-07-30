const { time } = require("highcharts");

module.exports = (sequelize, DataTypes) => {
  const Strategy = sequelize.define(
    "strategy",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      strategyid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      strategyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_portfolio_nav: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      nifty: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Add this line
    }
  );

  return Strategy;
};
