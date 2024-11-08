const { addLike, removeLike, getLikes } = require("../models/likesModel");

const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const result = await addLike(postId, userId);
    if (result) {
      res.status(201).json({ message: "Post liked successfully" });
    } else {
      res.status(400).json({ message: "You have already liked this post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error in liking blog post." });
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    await removeLike(postId, userId);
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error in unliking blog post." });
  }
};

const getPostLikes = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user?.id;
  try {
    const likes = await getLikes(postId, userId);
    res.status(200).json(likes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error in retrieving blog post likes." });
  }
};

module.exports = { likePost, unlikePost, getPostLikes };
