const express = require("express");

const {
  addBlogPost,
  getSinglePost,
  getPublishedBlogPosts,
  getAllBlogPostsForAdmin,
  getRandomBlogPosts,
  editBlogPost,
  getCategoryRelatedPosts,
  removeBlogPost,
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

// Get a single blog post
router.get("/:id", getSinglePost);

// Get all approved blog posts for public view
router.get("/", getPublishedBlogPosts);

/** SUPER ADMIN ROUTES
 * ===================================*/
router.use(isAuthenticated, isAuthorized("superAdmin"));

// Create a new blog post
router.post(
  "/",
  // isAuthenticated,
  // isAuthorized("superAdmin"),
  upload.single("image"),
  addBlogPost
);

// Get all blog posts for super-admin dashboard
router.get(
  "/admin",
  // isAuthenticated,
  // isAuthorized("superAdmin"),
  getAllBlogPostsForAdmin
);

// Update blog post
router.patch(
  "/:id",
  // isAuthenticated,
  // isAuthorized("superAdmin"),
  upload.single("imageUrl"),
  editBlogPost
);

// Delete blog post
router.delete(
  "/:id",
  // isAuthenticated,
  // isAuthorized("superAdmin"),
  removeBlogPost
);

module.exports = router;
