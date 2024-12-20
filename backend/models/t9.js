// models/t9.js
module.exports = (sequelize, DataTypes, schema) => {
  return sequelize.define('t9', {
    strategy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    realised: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    unrealised: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    }
  }, {
    tableName: 't9',
    schema: schema,
    timestamps: false
  });
};
