module.exports = (sequelize, DataTypes, schemaName) => {
  return sequelize.define('t1', {
    particulars: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pnl_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
  }, {
    tableName: 't1',
    schema: schemaName,
    timestamps: false
  });
};