const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;
require('dotenv').config();
const { upload, uploadFiles } = require("./routes/uploadFiles");
const emailCollectionRoutes = require('./routes/collectMail')
const strategyRoutes = require("./routes/strategyRoutes");
const emailRoutes = require('./routes/emailRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const sarlaPerformance = require('./routes/sarlaPerformance')
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

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
app.post("/api/uploads", upload.single("file"), uploadFiles);
app.use('/api/emails', emailRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/sarlaPerformance', sarlaPerformance); // Use the new route

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
