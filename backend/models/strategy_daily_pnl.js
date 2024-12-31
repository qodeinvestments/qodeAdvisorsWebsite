module.exports = (sequelize, DataTypes, schema) => {
    return sequelize.define('strategy_daily_pnl', {
      date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      daily_pnl: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      daily_value: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      strategy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      derivative_strategy: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'strategy_daily_pnl',
      schema: schema,
      timestamps: false
    });
  };