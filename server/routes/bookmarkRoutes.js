const express = require("express");
const {
  addBookmarkToPost,
  removeBookmarkFromPost,
  fetchBookmarkedPostsForUser,
} = require("../controllers/blogPostController");

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

// Add a bookmark
router.post("/bookmark", isAuthenticated, addBookmarkToPost);

// Remove a bookmark
router.post("/remove-bookmark", isAuthenticated, removeBookmarkFromPost);

// Get all bookmarks for a user
router.get("/bookmarks", isAuthenticated, fetchBookmarkedPostsForUser);

module.exports = router;
