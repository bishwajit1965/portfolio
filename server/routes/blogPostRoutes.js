const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addBlogPost,
  getSinglePost,
  fetchBlogPosts,
  editBloPost,
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

// Get all blog posts
router.get("/", fetchBlogPosts);

// Update blog post
router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  upload.single("image"),
  editBloPost
);

// Delete blog post
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  removeBlogPost
);

module.exports = router;
