const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to mongoDB
const { connectDB, getDB } = require("./utils/database");

(async () => {
  try {
    await connectDB(); //Database connected first
    const db = getDB(); //Gets the connected database instance

    // Import the routes here
    const adminRoutes = require("./routes/adminRoutes");
    const authRoutes = require("./routes/authRoutes");
    const projectRoutes = require("./routes/projectRoutes");
    const contactRoutes = require("./routes/contactRoutes");
    const skillsRoutes = require("./routes/skillsRoutes");
    const socialLinksRoutes = require("./routes/socialLinksRoutes");
    const testimonialRoutes = require("./routes/testimonialRoutes");
    const briefIntroRoutes = require("./routes/briefIntroRoutes");
    const achievementsRoutes = require("./routes/achievementsRoutes");
    const adminInfoRoutes = require("./routes/adminInfoRoutes");
    const inspirationalQuoteRoutes = require("./routes/inspirationalQuoteRoutes");
    const hobbyRoutes = require("./routes/hobbyRoutes");
    const featuredProjectRoutes = require("./routes/featuredProjectRoutes");
    const journeyMilestonesRoutes = require("./routes/journeyMilestonesRoutes");
    const validateCopyrightMiddlewareRules = require("./routes/copyrightTextRoutes");

    // Initialize your routes here
    app.use("/api/admin", adminRoutes);
    app.use("/api/auth", authRoutes); // Authentication routes
    app.use("/api/projects", projectRoutes);
    app.use("/api/contacts", contactRoutes);
    app.use("/api/skills", skillsRoutes);
    app.use("/api/socialLinks", socialLinksRoutes);
    app.use("/api/testimonials", testimonialRoutes);
    app.use("/api/brief-intro", briefIntroRoutes);
    app.use("/api/achievements", achievementsRoutes);
    app.use("/api/admin-info", adminInfoRoutes);
    app.use("/api/inspirational-quote", inspirationalQuoteRoutes);
    app.use("/api/hobby", hobbyRoutes);
    app.use("/api/featured-projects", featuredProjectRoutes);
    app.use("/api/journey-milestones", journeyMilestonesRoutes);
    app.use("/api/copyright", validateCopyrightMiddlewareRules);
    app.use("/api/admin", adminRoutes); //Super admin routes

    // Simple route to test server
    app.get("/", (req, res) => {
      res.send("Hello from the portfolio server!");
    });

    // Start the server after a successful database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
})();
