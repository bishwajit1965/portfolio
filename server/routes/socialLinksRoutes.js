const express = require("express");

const {
  createSocialLinks,
  getSocialLink,
  socialLinks,
  updateSocialLinkById,
  deleteSocialLinkById,
} = require("../controllers/socialLinksController");

const {
  validateSocialLinks,
  validateSocialLinksById,
} = require("../middlewares/validateSocialLinks");

const router = express.Router();

router.post("/", validateSocialLinks, createSocialLinks);
router.get("/:id", getSocialLink);
router.get("/", socialLinks);
router.patch(
  "/:id",
  validateSocialLinks,
  validateSocialLinksById,
  updateSocialLinkById
);
router.delete("/:id", deleteSocialLinkById);

module.exports = router;
