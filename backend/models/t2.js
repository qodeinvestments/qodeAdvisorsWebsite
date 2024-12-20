module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t2', {
    strategy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profit: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    }
  }, {
    tableName: 't2',
    schema: schema,  // Use the passed schema
    timestamps: false
  });
};