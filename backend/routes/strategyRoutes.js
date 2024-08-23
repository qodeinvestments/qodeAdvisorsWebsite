const express = require("express");
const {
  getAllStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
  deleteStrategy,
} = require("../controllers/strategyControllers");

const router = express.Router();

router.get("/", getAllStrategies);
router.get("/:strategyid", getStrategyById);
router.post("/", createStrategy);
router.put("/:id", updateStrategy);
router.delete("/:id", deleteStrategy);

module.exports = router;
