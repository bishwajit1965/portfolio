const {
  insertNewComment,
  getComments,
  fetchCommentsByPostId,
  updateComment,
  removeCommentById,
} = require("../models/commentModel");

const { ObjectId } = require("mongodb");

// Create new comment
const handleCreateComment = async (req, res) => {
  try {
    const {
      postId,
      userId,
      content,
      authorId,
      authorEmail,
      author,
      photoUrl,
      parentId,
    } = req.body;
    console.log("Request Body:", req.body);
    // Check if user ID is available
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User is not authenticated" });
    }
    const newComment = {
      postId: new ObjectId(postId),
      userId: new ObjectId(req.user._id) || userId,
      content,
      authorId,
      authorEmail,
      author,
      photoUrl,
      parentId: parentId ? new ObjectId(parentId) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "approved",
    };
    console.log("New Comment Data:", newComment);

    const comment = await insertNewComment(newComment);
    res.status(201).json({ message: "Comment added successfully.", comment });
  } catch (error) {
    console.error("Error in creating comment:", error.message);
    res.status(500).json({ error: "Error in creating comment" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const result = await getComments();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in creating comment:", error.message);
    res.status(500).json({ error: "Error in fetching comments." });
  }
};
// Fetch comment for a post
const handleFetchComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await fetchCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments." });
  }
};

// Update comment status
const updateCommentStatus = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    console.log("Received ID for update:", id);
    console.log("Updated Data:", updatedData);

    const updatedComment = await updateComment(id, updatedData);

    if (updatedComment.modifiedCount > 0) {
      console.log("Comment status updated successfully.");
      res.status(200).json({
        message: "Comment status updated successfully!",
        updatedComment,
      });
    } else {
      console.log("No status updated, document not found.");
      res.status(400).json({ message: "Comment status not found." });
    }
  } catch (error) {
    console.error("Error in updating comment status:", error);
    res
      .status(500)
      .json({ message: "Error in updating comment status.", error });
  }
};

// Delete a comment
const handleDeleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeCommentById(id);
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
  getAllComments,
  handleFetchComment,
  updateCommentStatus,
  handleDeleteComment,
};
