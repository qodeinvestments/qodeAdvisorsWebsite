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
        is: /^[0-9]{10}$/
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
    location: { // Include if required by database schema
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    additional_message: {
      type: DataTypes.TEXT,
      allowNull: true,
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