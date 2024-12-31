// routes/sarlaPerformanceRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Helper function to get data from a specific schema
async function getSchemaData(schema) {
  const allData = {};
  const tableNames = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10','strategyDailyPnl'];
  
  for (const tableName of tableNames) {
    const schemaPrefix = schema.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const TableModel = db[`${schemaPrefix}${tableName}`];
    
    if (!TableModel) {
      console.warn(`Model for table ${tableName} in schema ${schema} not found`);
      continue;
    }
    
    const tableData = await TableModel.findAll({
      raw: true
    });
    
    allData[tableName] = tableData;
  }
  
  return allData;
}

// GET route to fetch data from a specific schema
router.get('/:schema', async (req, res) => {
  try {
    const { schema } = req.params;
    const validSchemas = [
      'sarla_performance',
      'sarla_performance_batch1',
      'sarla_performance_batch2'
    ];
    
    if (!validSchemas.includes(schema)) {
      return res.status(400).json({ error: 'Invalid schema name' });
    }
    
    const schemaData = await getSchemaData(schema);
    res.json(schemaData);
  } catch (error) {
    console.error(`Error fetching data from schema ${req.params.schema}:`, error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// GET route to fetch data from all schemas
router.get('/', async (req, res) => {
  try {
    const schemas = [
      'sarla_performance',
      'sarla_performance_batch1',
      'sarla_performance_batch2'
    ];
    const allSchemasData = {};
    
    for (const schema of schemas) {
      allSchemasData[schema] = await getSchemaData(schema);
    }
    
    res.json(allSchemasData);
  } catch (error) {
    console.error('Error fetching data from all schemas:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// GET route for specific table in a schema with pagination
router.get('/:schema/:table', async (req, res) => {
  try {
    const { schema, table } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const validSchemas = [
      'sarla_performance',
      'sarla_performance_batch1',
      'sarla_performance_batch2'
    ];
    const validTables = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10','strategyDailyPnl'];
    
    if (!validSchemas.includes(schema)) {
      return res.status(400).json({ error: 'Invalid schema name' });
    }
    
    if (!validTables.includes(table)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }
    
    const schemaPrefix = schema.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const TableModel = db[`${schemaPrefix}${table}`];
    
    if (!TableModel) {
      return res.status(404).json({ error: 'Table model not found' });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    const { count, rows } = await TableModel.findAndCountAll({
      offset,
      limit: parseInt(limit),
      raw: true,
      order: [['date', 'DESC']] // Assuming you want to order by date
    });
    
    res.json({
      total: count,
      pages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      data: rows
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;