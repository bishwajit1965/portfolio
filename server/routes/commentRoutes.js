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

// Add comment
router.post("/", verifyAuth, handleCreateComment);

// Fetch all comments for super-admin
router.get("/", getAllComments);

// Fetch comments
router.get("/:postId", handleFetchComment);

// Update comment status
router.patch("/:id", verifyRole("superAdmin"), updateCommentStatus);

// Delete comment
router.delete("/:id", verifyRole("superAdmin"), handleDeleteComment);

module.exports = router;
