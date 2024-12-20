const express = require("express");
const {
  createProject,
  getProject,
  getProjects,
  updateProjectById,
  updateProjectVisibility,
  deleteProjectById,
} = require("../controllers/projectController");

const validateProjectData = require("../middlewares/validateProjectData");
const upload = require("../middlewares/upload");

const verifyToken = require("../middlewares/authMiddleware");
// const uploadMiddleware = require("../middlewares/upload");
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

router.patch("/visibility/:projectId", updateProjectVisibility);

router.delete("/:id", deleteProjectById);

module.exports = router;
