const { getDB } = require("../utils/database");

const { ObjectId } = require("mongodb");

// Insert a new comment
const insertNewComment = async (commentData) => {
  try {
    const db = getDB();
    const result = await db.collection("comments").insertOne(commentData);
    console.log("Data  fetched:", result);
    return result;
  } catch (error) {
    console.error("Error inserting comment:", error.message);
    throw new Error("Error in creating comment." + error.message);
  }
};

//Retrieve comments for a specific post
const fetchCommentsByPostId = async (postId) => {
  try {
    const db = getDB();
    const comments = await db
      .collection("comments")
      .find({ postId: new ObjectId(postId) })
      .toArray();
    return comments;
  } catch (error) {
    throw new Error("Error in fetching comments" + error.message);
  }
};

// Remove a comment by ID
const removeCommentById = async (commentId) => {
  try {
    const db = getDB();
    const result = await db
      .collection("comments")
      .deleteOne({ _id: new ObjectId(commentId) });
  } catch (error) {
    throw new Error("Error in deleting comments" + error.message);
  }
};

module.exports = { insertNewComment, fetchCommentsByPostId, removeCommentById };
