// models/t6.js
module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t6', {
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
    cost: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    cost_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  }, {
    tableName: 't6',
    schema: schema,
    timestamps: false
  });
};