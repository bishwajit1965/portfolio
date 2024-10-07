const express = require("express");
const {
  createProject,
  getProject,
  getProjects,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/projectController");

const validateProjectData = require("../middlewares/validateProjectData");
const upload = require("../middlewares/upload");

const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), validateProjectData, createProject);
router.get("/:id", getProject);
router.get("/", getProjects);
router.patch(
  "/:id",
  upload.single("image"),
  validateProjectData,
  updateProjectById
);
router.delete("/:id", deleteProjectById);

module.exports = router;
