module.exports = (sequelize, DataTypes) => {
  const Strategy = sequelize.define(
    "strategy",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      strategyid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      strategyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_portfolio_nav: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      benchmark_values: { // This replaces the 'nifty' column
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      benchmark: { // This is the new 'benchmark' column
        type: DataTypes.STRING,
        allowNull: true, // Assuming it's nullable; adjust if needed
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Keeps the model without 'createdAt' and 'updatedAt'
    }
  );

  return Strategy;
};
