const express = require("express");
const {
  likePost,
  unlikePost,
  getPostLikes,
} = require("../controllers/likesController");
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const isUserAuthorized = require("../middlewares/isUserAuthorized");

const router = express.Router();

router.get("/posts/:postId/likes", getPostLikes);

router.post(
  "/posts/:postId/like",
  authenticatedUser,
  isUserAuthorized("user", "editor", "superAdmin"),
  likePost
);

// Unlike a post
router.delete(
  "/posts/:postId/like",
  authenticatedUser,
  isUserAuthorized("user", "editor", "superAdmin"),
  unlikePost
);

module.exports = router;
