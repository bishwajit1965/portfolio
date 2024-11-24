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

const getComments = async (req, res) => {
  const db = getDB();
  const commentsCollection = db.collection("comments");
  try {
    const comments = await commentsCollection.find().toArray();
    return comments;
  } catch (error) {
    throw new Error("Error in fetching comments" + error.message);
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

// Update comment status
const updateComment = async (id, updatedCommentData) => {
  try {
    const db = getDB();
    const objectId = new ObjectId(id);
    const { _id, ...updatedComment } = updatedCommentData;

    console.log("Updating tag with ObjectId:", objectId);
    console.log("Update data:", updatedComment);

    const result = await db
      .collection("comments")
      .updateOne(
        { _id: objectId },
        { $set: { status: updatedComment.status, updatedAt: new Date() } }
      );

    console.log("MongoDB update result:", result);
    return result;
  } catch (error) {
    throw new Error("Error in updating comment status: " + error.message);
  }
};

// Remove a comment by ID
const removeCommentById = async (commentId) => {
  try {
    const objectId = new ObjectId(commentId);
    const db = getDB();
    const result = await db.collection("comments").deleteOne({ _id: objectId });
  } catch (error) {
    throw new Error("Error in deleting comments" + error.message);
  }
};

module.exports = {
  insertNewComment,
  getComments,
  updateComment,
  fetchCommentsByPostId,
  removeCommentById,
};
