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
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    phone_number: {
      type: DataTypes.STRING, // Changed from INTEGER to STRING
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[0-9]{10}$/ // Validates 10-digit phone numbers
      }
    },
    investment_goal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    investment_experience: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    preferred_strategy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    initial_investment_size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    additional_message: {
      type: DataTypes.TEXT, // Changed from STRING to TEXT for longer messages
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE, // Changed from STRING to DATE
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE, // Changed from STRING to DATE
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ClientEnquiry',
    tableName: 'client_enquiry',
    timestamps: true,
    hooks: {
      beforeCreate: (record) => {
        record.createdAt = moment().tz('Asia/Kolkata');
        record.updatedAt = moment().tz('Asia/Kolkata');
      },
      beforeUpdate: (record) => {
        record.updatedAt = moment().tz('Asia/Kolkata');
      }
    }
  });

  return ClientEnquiry;
};