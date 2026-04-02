const express = require("express");
const {
  createProject,
  getProject,
  getProjects,
  updateProjectById,
  updateProjectVisibility,
  deleteProjectById,
  deleteProjectImage,
} = require("../controllers/projectController");

const validateProjectData = require("../middlewares/validateProjectData");
const upload = require("../middlewares/upload");

const projectUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "screenshotFiles", maxCount: 20 },
]);

const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", getProject);

router.get("/", getProjects);

router.post(
  "/",
  verifyToken,
  projectUpload,
  validateProjectData,
  createProject,
);

router.patch(
  "/:id",
  verifyToken,
  projectUpload,
  validateProjectData,
  updateProjectById,
);

router.patch("/visibility/:projectId", verifyToken, updateProjectVisibility);

router.delete("/:projectId/image", verifyToken, deleteProjectImage);

router.delete("/:id", verifyToken, deleteProjectById);

module.exports = router;
