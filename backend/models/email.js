
// email.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Email.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'Email',
    tableName: 'emails',
    timestamps: true
  });

  return Email;
};