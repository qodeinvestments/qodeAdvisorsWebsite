const db = require("../models");
const strategy = require("../models/strategy");
const Strategy = db.Strategy;
const getAllStrategies = async (req, res) => {
  try {
    // //console.log("Attempting to fetch all strategies...");
    const strategies = await Strategy.findAll();
    res.status(200).json(strategies);
  } catch (error) {
    console.error("Error fetching strategies:", error);
    res.status(500).json({ error: error.message });
  }
};

const getStrategyById = async (req, res) => {
  try {
    const { strategyid } = req.params;
    const strategies = await Strategy.findAll({
      where: { strategyid: strategyid },
    });

    if (strategies && strategies.length > 0) {
      res.status(200).json(strategies);
    } else {
      res.status(404).json({ message: "Strategy not found" });
    }
  } catch (error) {
    console.error("Error in getStrategyById:", error);
    res.status(500).json({ error: error.message });
  }
};

const createStrategy = async (req, res) => {
  try {
    const newStrategy = await Strategy.create(req.body);
    res.status(201).json(newStrategy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStrategy = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Strategy.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedStrategy = await Strategy.findByPk(id);
      res.status(200).json(updatedStrategy);
    } else {
      res.status(404).json({ message: "Strategy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStrategy = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Strategy.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Strategy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
  deleteStrategy,
};
