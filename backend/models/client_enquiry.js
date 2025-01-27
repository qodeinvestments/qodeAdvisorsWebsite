'use strict';
const { Model } = require('sequelize');
const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  class ClientEnquiry extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  ClientEnquiry.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    investment_goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    investment_experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferred_strategy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    initial_investment_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additional_message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
    }
  }, {
    sequelize,
    modelName: 'ClientEnquiry',
    tableName: 'client_enquiry',
    timestamps: true,
    hooks: {
      beforeCreate: (record) => {
        const currentTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        record.createdAt = currentTime;
        record.updatedAt = currentTime;
      },
      beforeUpdate: (record) => {
        record.updatedAt = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
      }
    }
  });

  return ClientEnquiry;
};