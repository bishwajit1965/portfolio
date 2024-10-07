const express = require("express");
const { ObjectId } = require("mongodb");
const {
  createFeaturedProject,
  getFeaturedProject,
  getAllFeaturedProjects,
  updateFeaturedProject,
  deleteFeaturedProject,
} = require("../controllers/featuredProjectController");

const {
  featuredProjectValidationRules,
  validate,
  validateFeaturedProjectById,
} = require("../middlewares/validateFeaturedProjectData");

const router = express.Router();

router.post(
  "/",
  featuredProjectValidationRules(),
  validate,
  createFeaturedProject
);
router.get("/:id", validateFeaturedProjectById, getFeaturedProject);
router.get("/", getAllFeaturedProjects);
router.patch(
  "/:id",
  validateFeaturedProjectById,
  featuredProjectValidationRules(),
  validate,
  updateFeaturedProject
);
router.delete("/:id", validateFeaturedProjectById, deleteFeaturedProject);

module.exports = router;
