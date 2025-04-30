// strategyNav.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StrategyNav extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  StrategyNav.init({
    date: {
      type: DataTypes.DATEONLY,  // DATEONLY for date without time
      allowNull: false,
      primaryKey: true,          // Assuming each date is unique in your table
    },
    qtf: {
      type: DataTypes.FLOAT,
      allowNull: true,           // Set to true if column can have null values
    },
    qaw: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    qgf: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    qfh: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_50: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bse_500: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_midcap_100: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_smallcap_100: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_midcap_150_momentum_50: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_low_volatility_50: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_200_quality_30: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_alpha_50: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nifty_500_value_50: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'StrategyNav',
    tableName: 'strategy_navs',  // Explicit table name matching your DB
    timestamps: false             // Disable timestamps if not present in table
  });

  return StrategyNav;
};
