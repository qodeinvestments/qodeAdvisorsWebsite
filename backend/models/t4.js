// models/t4.js

module.exports = (sequelize, DataTypes, schema) => {
  // Define the base attributes for table t4
  const attributes = {
    put_protection: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    covered_calls: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    },
    long_options: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    }
  };

  // Conditionally add the dynamic_puts column for sarla_performance_batch2 schema
  if (schema === 'sarla_performance_batch2') {
    attributes.dynamic_puts = {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true
    };
  }

  // Define the model with the conditionally extended attributes
  return sequelize.define('t4', attributes, {
    tableName: 't4',
    schema: schema,
    timestamps: false
  });
};
