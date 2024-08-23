const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;
require('dotenv').config();

const strategyRoutes = require("./routes/strategyRoutes");
const mailerLiteRoutes = require("./routes/mailerLiteRoutes");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.MAILERLITE_API_KEY);

// Middleware
app.use(cors({
  origin: true,
  methods: "*",
  allowedHeaders: "*",
}));
app.use(bodyParser.json());

// Initialize MailerLite
const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY
});

// Routes
app.use("/api/strategies", strategyRoutes);
app.use("/api/mailerlite", mailerLiteRoutes(mailerlite));

// Database connection and server start
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });