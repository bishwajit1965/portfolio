const express = require("express");

const { authenticatedUser } = require("../middlewares/authenticatedUser");
const isUserAuthorized = require("../middlewares/isUserAuthorized");

const {
  insertSystemPreferences,
  fetchSystemPreferences,
  editSystemPreferences,
  deleteSystemPreferences,
} = require("../controllers/systemPreferencesController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post(
  "/",
  authenticatedUser,
  isUserAuthorized("superAdmin"),
  upload.single("imageUrl"),
  insertSystemPreferences,
);

// Update blog post
router.patch(
  "/:id",
  authenticatedUser,
  isUserAuthorized("superAdmin"),
  upload.single("imageUrl"),
  editSystemPreferences,
);

// Update blog post
router.delete(
  "/:id",
  authenticatedUser,
  isUserAuthorized("superAdmin"),
  // upload.single("imageUrl"),
  deleteSystemPreferences,
);

router.get(
  "/",
  authenticatedUser,
  isUserAuthorized("superAdmin"),
  fetchSystemPreferences,
);
module.exports = router;
