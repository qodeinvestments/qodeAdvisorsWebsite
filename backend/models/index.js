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

// Initialize db object
const db = {
  sequelize,
  Sequelize,
};

// Initialize base models
db.Strategy = require("./strategy")(sequelize, Sequelize.DataTypes);
db.Email = require('./email')(sequelize, Sequelize.DataTypes);
db.StrategyNav = require('./strategyNav')(sequelize, Sequelize.DataTypes); // <-- Added StrategyNav model
db.ClientEnquiry = require('./client_enquiry')(sequelize, Sequelize.DataTypes); // <-- Added ClientEnquiry model

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
  strategyDailyPnl: require('./strategy_daily_pnl')(sequelize, Sequelize.DataTypes, schema),
});

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

// Initialize all associations
Object.values(db).forEach(model => {
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;
