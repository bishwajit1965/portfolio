const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addBlogPost,
  getSinglePost,
  getPublishedBlogPosts,
  getAllBlogPostsForAdmin,
  editBlogPost,
  getCategoryRelatedPosts,
  removeBlogPost,
} = require("../controllers/blogPostController");

const { isAuthenticated } = require("../middlewares/isAuthenticated");

const { isAuthorized } = require("../middlewares/isAuthorized");

const upload = require("../middlewares/upload");

const router = express.Router();

// Create a new blog post
router.post(
  "/",
  isAuthenticated,
  isAuthorized("superAdmin"),
  upload.single("image"),
  addBlogPost
);

// Get a single blog post
router.get("/:id", getSinglePost);

// Get category related posts
router.get("/filter", getCategoryRelatedPosts);

// Get all approved blog posts for public view
router.get("/", getPublishedBlogPosts);

// Get all blog posts for super-admin dashboard
router.get(
  "/admin",
  isAuthenticated,
  isAuthorized("superAdmin"),
  getAllBlogPostsForAdmin
);

// Update blog post
router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  upload.single("imageUrl"),
  editBlogPost
);

// Delete blog post
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  removeBlogPost
);

module.exports = router;
