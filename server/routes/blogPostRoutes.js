const express = require("express");

const {
  addBlogPost,
  getSinglePost,
  getOnlyPublishedBlogPosts,
  getAllBlogPostsForAdmin,
  getRandomBlogPosts,
  editBlogPost,
  getCategoryRelatedPosts,
  removeBlogPost,
  blogPostComingSoon,
} = require("../controllers/blogPostController");

const { isAuthenticated } = require("../middlewares/isAuthenticated");

const { isAuthorized } = require("../middlewares/isAuthorized");

const upload = require("../middlewares/upload");

const router = express.Router();

/** PUBLIC ROUTES
 * ===================================*/

// Get category related posts
router.get("/filter", getCategoryRelatedPosts);

// Get random latest posts
router.get("/random-latest", getRandomBlogPosts);

// Get blog post coming soon
router.get("/coming-soon", blogPostComingSoon);

// Get a single blog post
router.get("/:id", getSinglePost);

// Get all approved blog posts for public view
router.get("/", getOnlyPublishedBlogPosts);

/** SUPER ADMIN ROUTES
 * ===================================*/
router.use(isAuthenticated, isAuthorized("superAdmin"));

// Get all blog posts for super-admin dashboard
router.get("/admin", getAllBlogPostsForAdmin);

// Update blog post
router.patch("/:id", upload.single("imageUrl"), editBlogPost);

// Delete blog post
router.delete("/:id", removeBlogPost);

// Create a new blog post
router.post("/", upload.single("image"), addBlogPost);

module.exports = router;
