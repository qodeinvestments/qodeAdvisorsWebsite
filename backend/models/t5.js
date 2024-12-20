// models/t5.js
module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t5', {
    strategy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trade_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    entry_price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    current_price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    profit_and_loss: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    }
  }, {
    tableName: 't5',
    schema: schema,
    timestamps: false
  });
};