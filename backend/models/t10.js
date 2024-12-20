// models/t10.js
module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t10', {
    strategy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    realised_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    unrealised_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  }, {
    tableName: 't10',
    schema: schema,
    timestamps: false
  });
};