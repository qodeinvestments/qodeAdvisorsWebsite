const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;
require('dotenv').config();
const { upload, uploadFiles } = require("./routes/uploadFiles");
const emailCollectionRoutes = require('./routes/collectMail');
const strategyRoutes = require("./routes/strategyRoutes");
const emailRoutes = require('./routes/emailRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const sarlaPerformance = require('./routes/sarlaPerformance');
const graphRoutes = require('./routes/graphRoutes');
const strategyNavRoutes = require('./routes/strategyNavRoutes'); // <-- New route import
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 4000;
const session = require('express-session');

const allowedOrigins = ["https://qodeinvest.com", "https://dashboard.qodeinvest.com", "https://www.qodeinvest.com","https://research.qodeinvest.com"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "*",
  allowedHeaders: "*",
}));



app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use("/api/strategies", strategyRoutes);
app.post("/api/uploads", upload.single("file"), uploadFiles);
app.use('/api/emails', emailRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/sarlaPerformance', sarlaPerformance);
app.use('/api/graph', graphRoutes);
app.use('/api/strategyNavs', strategyNavRoutes); // <-- New route usage

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
