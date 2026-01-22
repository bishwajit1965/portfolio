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
const projectUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "screenshots", maxCount: 10 },
]);

const verifyToken = require("../middlewares/authMiddleware");
// const uploadMiddleware = require("../middlewares/upload");
const router = express.Router();

router.post(
  "/",
  projectUpload,
  // upload.array( "images" ),
  validateProjectData,
  createProject,
);

router.get("/:id", getProject);

router.get("/", getProjects);

router.patch(
  "/:id",
  projectUpload,
  // upload.array("images"),
  validateProjectData,
  updateProjectById,
);

router.patch("/visibility/:projectId", updateProjectVisibility);

router.delete("/:id", deleteProjectById);

module.exports = router;
