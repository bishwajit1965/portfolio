const express = require("express");

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAuthorized } = require("../middlewares/isAuthorized");
const {
  addTag,
  getTags,
  updateTagById,
  deleteTagById,
} = require("../controllers/tagController");

const router = express.Router();

// Route to create a new tag
router.post("/", isAuthenticated, isAuthorized("superAdmin"), addTag);

// Route to get all tags
router.get("/", getTags);

//Route to update tag
router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  updateTagById
);

//Route to delete tag
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  deleteTagById
);

module.exports = router;
