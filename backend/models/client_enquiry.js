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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // Updated regex to allow international format with "+" prefix followed by 1-15 digits
        is: /^\+\d{1,15}$/
      }
    },
    investment_goal: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to make field optional
    },
    investment_experience: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to make field optional
    },
    preferred_strategy: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to make field optional
    },
    initial_investment_size: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to make field optional
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to make field optional
    },
    additional_message: {
      type: DataTypes.TEXT,
      allowNull: true, // Keep as required to match frontend
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ClientEnquiry',
    tableName: 'client_enquiry',
    timestamps: true,
    hooks: {
      beforeCreate: (record) => {
        record.createdAt = moment().tz('Asia/Kolkata').toDate();
        record.updatedAt = moment().tz('Asia/Kolkata').toDate();
      },
      beforeUpdate: (record) => {
        record.updatedAt = moment().tz('Asia/Kolkata').toDate();
      }
    }
  });

  return ClientEnquiry;
};