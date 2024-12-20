// models/t7.js
module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t7', {
    strategy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    exposure: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    profit: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    profit_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cost_recovered: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    }
  }, {
    tableName: 't7',
    schema: schema,
    timestamps: false
  });
};