const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database"); // Modify this to your DB connection setup

const addLike = async (postId, userId) => {
  const db = getDB();
  const likesCollection = db.collection("likes");
  try {
    const existingLike = await likesCollection.findOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
    });

    if (!existingLike) {
      return await likesCollection.insertOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
        createdAt: new Date(),
      });
    }
    return null;
  } catch (error) {
    console.error("Like is not added.", error);
  }
};

const removeLike = async (postId, userId) => {
  const db = getDB();
  const likesCollection = db.collection("likes");
  try {
    return await likesCollection.deleteOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
    });
  } catch (error) {
    console.error("Like is not removed.", error);
  }
};

const getLikes = async (postId, userId) => {
  const db = getDB();
  const likesCollection = db.collection("likes");
  try {
    // Combine the countDocuments and findOne in a single query for better performance
    const [likeCount, userHasLiked] = await Promise.all([
      likesCollection.countDocuments({ postId: new ObjectId(postId) }),
      likesCollection.findOne({
        postId: new ObjectId(postId),
        userId: new ObjectId(userId),
      }),
    ]);

    return { likeCount, userHasLiked: !!userHasLiked }; // Return both like count and userLike status
  } catch (error) {
    console.error("Error getting likes:", error);
    throw new Error("Error fetching likes");
  }
};

module.exports = { addLike, removeLike, getLikes };
