const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const csurf = require("csurf");
const session = require("express-session");
const Redis = require("redis");
const MailerLite = require("@mailerlite/mailerlite-nodejs").default;
require("dotenv").config();
const { upload, uploadFiles } = require("./routes/uploadFiles");
const emailCollectionRoutes = require("./routes/collectMail");
const strategyRoutes = require("./routes/strategyRoutes");
const emailRoutes = require("./routes/emailRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const sarlaPerformance = require("./routes/sarlaPerformance");
const graphRoutes = require("./routes/graphRoutes");
const strategyNavRoutes = require("./routes/strategyNavRoutes");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 4000;

// CRITICAL: Configure Express to trust the nginx proxy
// This enables proper client IP extraction from X-Forwarded-For and X-Real-IP headers
app.set('trust proxy', 1);

// Initialize Redis client
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

// Middleware
const allowedOrigins = [
  "https://qodeinvest.com",
  "https://dashboard.qodeinvest.com",
  "https://www.qodeinvest.com",
  "https://research.qodeinvest.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow OPTIONS
    allowedHeaders: ["Content-Type", "X-CSRF-Token"], // Allow x-csrf-token
    credentials: true, // Allow cookies for sessions
  })
);

// Handle CORS preflight requests
app.options("*", cors()); // Respond to OPTIONS requests for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    },
  })
);

// CSRF middleware
const csrfProtection = csurf({ cookie: false }); // Store CSRF token in session

// CSRF token endpoint
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Optional: Add middleware to log client IPs for debugging
app.use((req, res, next) => {
  console.log(`Request from IP: ${req.ip}, X-Forwarded-For: ${req.headers['x-forwarded-for']}, X-Real-IP: ${req.headers['x-real-ip']}`);
  next();
});

// Routes
app.use("/api/strategies", strategyRoutes);
app.post("/api/uploads", upload.single("file"), uploadFiles);
app.use("/api/emails", emailRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/sarlaPerformance", sarlaPerformance);
app.use("/api/graph", graphRoutes);
app.use("/api/strategyNavs", strategyNavRoutes);
app.use("/api/collectMail", emailCollectionRoutes);

// Database connection and server start
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Trust proxy setting: ${app.get('trust proxy')}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });