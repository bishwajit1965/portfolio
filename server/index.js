const express = require("express");
// const cron = require("node-cron");
const { startScheduler } = require("./utils/scheduler");
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

// Refetching scheduled post after a certain time
const { publishScheduledPosts } = require("./utils/publishScheduledPosts");

(async () => {
  try {
    await connectDB(); //Database connected first
    const db = getDB(); //Gets the connected database instance

    /** Import the routes here
     *==============================================**/
    // Blog posts route
    const blogPostRoutes = require("./routes/blogPostRoutes");
    // Likes route
    const likesRoutes = require("./routes/likesRoutes");
    // Tags route
    const tagRoutes = require("./routes/tagRoutes");
    // Comments route
    const commentRoutes = require("./routes/commentRoutes");
    // Super admin auth route
    const superAdminAuthRoutes = require("./routes/superAdminAuthRoutes");
    // Super admin route
    const superAdminRoutes = require("./routes/superAdminRoutes");
    const userRoutes = require("./routes/userRoutes");
    const categoryRoutes = require("./routes/categoryRoutes");
    // const adminRoutes = require("./routes/adminRoutes");
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

    /**Initialize your routes here
     *================================================= **/
    app.use("/api/blogPosts", blogPostRoutes);
    app.use("/api/admin/blogPosts/admin", blogPostRoutes);
    app.use("/api/coming-soon/blogPosts/coming-soon", blogPostRoutes);
    app.use("/api/likes", likesRoutes);
    app.use("/api/tags", tagRoutes);
    app.use("/api/comments", commentRoutes);
    app.use("/api/super-admin/auth", superAdminAuthRoutes);
    app.use("/api/super-admin/users", superAdminRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/categories", categoryRoutes);
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

    // Cron schedule of fetching at every minute
    // cron.schedule("1,2,4,5 * * * *", async () => {
    //   console.log("running every minute 1, 2, 4 and 5");
    //   await publishScheduledPosts();
    // });

    // Simple route to test server
    app.get("/", (req, res) => {
      res.send("Hello from the portfolio server!");
    });

    // Start the server after a successful database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Cron schedule of fetching at every minute
    startScheduler();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
})();
