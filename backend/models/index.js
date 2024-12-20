// models/index.js
const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config.development.url, {
  dialect: "postgres",
});

// Define your schemas
const schemas = [
  'sarla_performance',
  'sarla_performance_batch1',
  'sarla_performance_batch2'
];

// Function to create models for schema
const createModelsForSchema = (schema) => ({
  t1: require('./t1')(sequelize, Sequelize.DataTypes, schema),
  t2: require('./t2')(sequelize, Sequelize.DataTypes, schema),
  t3: require('./t3')(sequelize, Sequelize.DataTypes, schema),
  t4: require('./t4')(sequelize, Sequelize.DataTypes, schema),
  t5: require('./t5')(sequelize, Sequelize.DataTypes, schema),
  t6: require('./t6')(sequelize, Sequelize.DataTypes, schema),
  t7: require('./t7')(sequelize, Sequelize.DataTypes, schema),
  t8: require('./t8')(sequelize, Sequelize.DataTypes, schema),
  t9: require('./t9')(sequelize, Sequelize.DataTypes, schema),
  t10: require('./t10')(sequelize, Sequelize.DataTypes, schema),
});

const db = {
  sequelize,
  Sequelize,
};

// Add models for each schema with prefix
schemas.forEach(schema => {
  const schemaPrefix = schema.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
    
  const models = createModelsForSchema(schema);
  
  Object.entries(models).forEach(([modelName, model]) => {
    db[`${schemaPrefix}${modelName}`] = model;
  });
});

module.exports = db;