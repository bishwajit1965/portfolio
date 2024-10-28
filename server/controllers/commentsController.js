const {
  insertNewComment,
  fetchCommentsByPostId,
  removeCommentById,
} = require("../models/commentModel");

const { ObjectId } = require("mongodb");

// Controller to create new comment
const handleCreateComment = async (req, res) => {
  try {
    const { postId, content, parentId } = req.body;
    console.log("Request Body:", req.body);
    // Check if user ID is available
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User is not authenticated" });
    }
    const newComment = {
      postId: new ObjectId(postId),
      userId: new ObjectId(req.user._id),
      content,
      parentId: parentId ? new ObjectId(parentId) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "approved",
    };
    console.log("New Comment Data:", newComment);

    const comment = await insertNewComment(newComment);
    res.status(201).json({ message: "Comment added.", comment });
  } catch (error) {
    console.error("Error in handleCreateComment:", error.message);
    res.status(500).json({ error: "Error in creating comment" });
  }
};

// Controller to fetch comment for a post
const handleFetchComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await fetchCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments." });
  }
};

// Controller to delete a comment
const handleDeleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeCommentById({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Comment not found." });
    }
    res.json({ message: "Comment deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment." });
  }
};

module.exports = {
  handleCreateComment,
  handleFetchComment,
  handleDeleteComment,
};
