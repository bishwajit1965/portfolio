const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const {
  addProject,
  getProjectById,
  getAllProjects,
  updateProject,
  toggleProjectVisibility,
  deleteProject,
} = require("../models/projectModel");

// Constants for Cloudinary paths
const mainPath = process.env.PROJECT_MAIN_PATH;
const screenshotsPath = process.env.PROJECT_SCREENSHOTS_PATH;

// Utility functions for image handling
const { uploadImage, deleteImage } = require("../utils/upload.service");

/***=====================================
 * Project Controller methods:
 *=======================================*/
// Create a new project with main image and multiple screenshots
const createProject = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      githubLink,
      liveLink,
      visibility = "visible",
      techStacks,
    } = req.body;

    const mainImageFile = req.files?.mainImage?.[0];
    const screenshotFiles = req.files?.screenshotFiles || [];

    // -------------------------------
    // Upload main image
    // -------------------------------
    const mainImageData = mainImageFile
      ? await uploadImage(mainImageFile, mainPath)
      : null;

    // -------------------------------
    // Parse structured metadata
    // -------------------------------
    let screenshotsMeta = [];

    try {
      screenshotsMeta = JSON.parse(req.body.screenshotsMeta || "[]");
    } catch (err) {
      console.error("❌ Failed to parse screenshotsMeta");
      screenshotsMeta = [];
    }

    // -------------------------------
    // Upload screenshots with metadata
    // -------------------------------
    const uploadedScreenshots = await Promise.all(
      screenshotFiles.map(async (file, i) => {
        const meta = screenshotsMeta[i] || {};

        return {
          id: new ObjectId().toString(),
          category: meta.category || "General",
          image: await uploadImage(file, screenshotsPath),
          caption: meta.caption || "",
        };
      }),
    );

    // -------------------------------
    // Group screenshots by category
    // -------------------------------
    const categoriesMap = {};

    uploadedScreenshots.forEach((item) => {
      if (!categoriesMap[item.category]) {
        categoriesMap[item.category] = [];
      }

      categoriesMap[item.category].push({
        id: item.id,
        image: item.image,
        caption: item.caption,
      });
    });

    const screenshots = Object.entries(categoriesMap).map(
      ([category, items]) => ({
        id: new ObjectId().toString(),
        category,
        items,
      }),
    );

    // -------------------------------
    // Normalize tech stacks
    // -------------------------------
    const normalizedTechStacks = Array.isArray(techStacks)
      ? techStacks.filter(Boolean)
      : techStacks
        ? [techStacks]
        : [];

    // -------------------------------
    // Save Project
    // -------------------------------
    const projectData = {
      name,
      type,
      description,
      githubLink,
      liveLink,
      visibility,
      image: mainImageData,
      screenshots,
      techStacks: normalizedTechStacks,
      createdAt: new Date(),
    };

    const project = await addProject(projectData);

    res.status(201).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("❌ Error in createProject:", error);

    res.status(500).json({
      message: "Failed to create project",
      error: error.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve project", error });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve projects", error });
  }
};

/**
 * Update project including:
 * - Main image replacement
 * - Screenshot addition or replacement
 */
const updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    // -----------------------------
    // BASIC FIELDS
    // -----------------------------
    const updateFields = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
      visibility: req.body.visibility,
      techStacks: Array.isArray(req.body.techStacks)
        ? req.body.techStacks
        : req.body.techStacks
          ? [req.body.techStacks]
          : [],
    };

    // -----------------------------
    // MAIN IMAGE
    // -----------------------------
    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];
      if (project.image?.public_id) await deleteImage(project.image.public_id);
      const uploaded = await uploadImage(file, "portfolio/projects/main");
      updateFields.image = uploaded;
    }

    // -----------------------------
    // SCREENSHOTS (FULL REBUILD)
    // -----------------------------
    let screenshots = [];

    // Parse payload
    let payload = req.body.screenshotsPayload;
    if (Array.isArray(payload)) payload = payload[0];
    if (typeof payload === "string") payload = JSON.parse(payload);

    const files = req.files?.screenshotFiles || [];
    let fileIndex = 0;

    for (const cat of payload) {
      const newCategory = {
        id: cat.id || new ObjectId().toString(),
        category: cat.category || "Uncategorized",
        items: [],
      };

      for (const item of cat.items) {
        let imageData = null;

        // 1️⃣ New file upload
        if (item.hasNewFile && files[fileIndex]) {
          const file = files[fileIndex];
          fileIndex++;
          imageData = await uploadImage(file, "portfolio/projects/screenshots");
        }
        // 2️⃣ Existing file
        else {
          const oldItem = project.screenshots
            ?.flatMap((c) => c.items)
            ?.find((i) => i.id === item.id);
          imageData = oldItem?.image || null;
        }

        newCategory.items.push({
          id: item.id || new ObjectId().toString(),
          image: imageData,
          caption: item.caption || "",
        });
      }

      screenshots.push(newCategory);
    }

    updateFields.screenshots = screenshots;

    // -----------------------------
    // UPDATE DATABASE
    // -----------------------------
    const result = await updateProject(id, updateFields);

    return res.status(200).json({
      message: "Project updated successfully",
      result,
    });
  } catch (error) {
    console.error("updateProjectById error:", error);
    res.status(500).json({
      message: "Failed to update project",
      error: error.message,
    });
  }
};

const updateProjectVisibility = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { visibility } = req.body;

    if (
      !visibility ||
      (visibility !== "visible" && visibility !== "invisible")
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Visibility status is required" });
    }

    const result = await toggleProjectVisibility(projectId, visibility);
    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error while updating toggle visibility");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete a single image (main or screenshot) from a project
 * @route DELETE /projects/:projectId/image
 * @body { imageId, type: 'main' | 'screenshot', category? }
 */

/**
 * Delete an image from a project
 * @param {string} projectId - Project _id
 * @param {string} type - "main" or "screenshot"
 * @param {string} imageId - required for screenshot
 * @param {string} category - required for screenshot
 */
const deleteProjectImage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { type, imageId, category } = req.body;

    const project = await getProjectById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (type === "main") {
      if (!project.image?.public_id)
        return res.status(400).json({ message: "No main image to delete" });

      await deleteImage(project.image.public_id);

      const result = await updateProject(projectId, { image: null });
      return res
        .status(200)
        .json({ message: "Main image deleted successfully", data: result });
    }

    if (type === "screenshot") {
      if (!category || !imageId)
        return res
          .status(400)
          .json({ message: "category and imageId required for screenshot" });

      const catIndex = project.screenshots.findIndex(
        (s) => s.category === category,
      );
      if (catIndex === -1)
        return res.status(404).json({ message: "Category not found" });

      const itemIndex = project.screenshots[catIndex].items.findIndex(
        (i) => i.id === imageId,
      );
      if (itemIndex === -1)
        return res.status(404).json({ message: "Screenshot not found" });

      // Delete image from cloud
      const oldImage = project.screenshots[catIndex].items[itemIndex].image;
      if (oldImage?.public_id) await deleteImage(oldImage.public_id);

      // Remove from DB
      project.screenshots[catIndex].items.splice(itemIndex, 1);

      // If category has no items left, remove the category
      if (project.screenshots[catIndex].items.length === 0) {
        project.screenshots.splice(catIndex, 1);
      }

      const result = await updateProject(projectId, {
        screenshots: project.screenshots,
      });
      return res
        .status(200)
        .json({ message: "Screenshot deleted successfully", data: result });
    }

    res
      .status(400)
      .json({ message: "Invalid type. Must be 'main' or 'screenshot'" });
  } catch (error) {
    console.error("deleteProjectImage error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete image", error: error.message });
  }
};

const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await getProjectById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 1️⃣ Delete main image
    if (project.image?.public_id) {
      await deleteImage(project.image.public_id);
    }

    // 2️⃣ Delete all screenshots
    if (project.screenshots?.length) {
      for (const cat of project.screenshots) {
        for (const item of cat.items) {
          if (item.image?.public_id) {
            await deleteImage(item.image.public_id);
          }
        }
      }
    }

    // 3️⃣ Delete project from DB
    const result = await deleteProject(id);

    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "Project and all images deleted successfully" });
    } else {
      return res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.error("deleteProjectById error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
};

module.exports = {
  createProject,
  getProject,
  getProjects,
  updateProjectVisibility,
  updateProjectById,
  deleteProjectImage,
  deleteProjectById,
};
