const express = require("express");

const verifyAuth = require("../middlewares/verifyAuth");
const {
  handleCreateComment,
  handleFetchComment,
  handleDeleteComment,
} = require("../controllers/commentsController");

const router = express.Router();

// Add comment
router.post("/", verifyAuth, handleCreateComment);

// Fetch comments
router.get("/:postId", handleFetchComment);

// Delete comment
router.delete("/:id", handleDeleteComment);

module.exports = router;
