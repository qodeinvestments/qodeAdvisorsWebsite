const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const strategyRoutes = require("./routes/strategyRoutes");
const db = require("./models");
const { getAllStrategies } = require("./controllers/strategyControllers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/strategies", strategyRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
