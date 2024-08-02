const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const strategyRoutes = require("./routes/strategyRoutes");
const db = require("./models");
const { getAllStrategies } = require("./controllers/strategyControllers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://qodeinvestments.com",
      "http://dashboard.qodeinvestments.com/",
    ], // or use ['http://example1.com', 'https://example2.com']
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(bodyParser.json());
app.use("/api/strategies", strategyRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, "139.5.190.184", () => {
      console.log(`Server running at http://139.5.190.184:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
