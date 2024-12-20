// models/t8.js
module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t8', {
    net_amount_to_be_recovered: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    net_amount_to_be_recovered_percentage: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    }
  }, {
    tableName: 't8',
    schema: schema,
    timestamps: false
  });
};