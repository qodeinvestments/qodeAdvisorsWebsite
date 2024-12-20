module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t3', {
    monthly_pnl: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    total_pnl: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    nifty_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  }, {
    tableName: 't3',
    schema: schema,
    timestamps: false
  });
};