const express = require("express");

const {
  handleCreateComment,
  getAllComments,
  handleFetchComment,
  updateCommentStatus,
  handleDeleteComment,
} = require("../controllers/commentsController");

const verifyAuth = require("../middlewares/verifyAuth");

const verifyRole = require("../middlewares/verifyRole");

const router = express.Router();

// Fetch comments for a post (specific route)
router.get("/:postId", handleFetchComment);

// Add comment
router.post("/", handleCreateComment);

// Fetch all comments for super-admin
router.get("/", getAllComments);

// Update comment status for SUPER ADMIN ONLY
router.patch("/:id", verifyRole("superAdmin"), updateCommentStatus);

// Delete comment for SUPER ADMIN ONLY
router.delete("/:id", verifyRole("superAdmin"), handleDeleteComment);

module.exports = router;
