const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const db = require("./MongoConnection"); 
const GundamRouter = require("./Routers/GundamRouter");
const UserRouter = require("./Routers/UserRouter");

const app = express();

// MongoDB connection
db.connect()
  .then(() => {
    console.log("MongoDB connected");
    
    // Middleware setup
    app.use(logger("dev")); // Enable request logging
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // CORS configuration
    const corsOptions = {
      origin: "http://localhost:3000", // Allow requests only from localhost:3000
      optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE11) require a 200 status for OPTIONS requests
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    };
    app.use(cors(corsOptions));

    // Session middleware
    app.use(session({
      secret: "keyboard cat", // Use environment variable or default value
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }
    }));

    // Routes
    app.use("/api/gundams", GundamRouter); // Mount GundamRouter at /api/gundams
    app.use("/api/users", UserRouter); // Mount UserRouter at /api/users

    app.get("/", (req, res) => {
      if (req.session.views) {
        req.session.views++;
        res.send(`Number of views: ${req.session.views}`);
      } else {
        req.session.views = 1;
        res.send("Welcome to the House of Gundams!");
      }
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something went wrong!");
    });

    // Start server
    const PORT = 3001; // Use environment port or default to 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed: ", err.message);
    process.exit(1); 
  });
