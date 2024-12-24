// strategy.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Strategy extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Strategy.init({
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
    benchmark_values: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    benchmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Strategy',
    tableName: 'strategies',  // Explicitly set table name
    timestamps: false
  });

  return Strategy;
};