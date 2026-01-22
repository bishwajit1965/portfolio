const {
  addProject,
  getProjectById,
  getAllProjects,
  updateProject,
  toggleProjectVisibility,
  deleteProject,
} = require("../models/projectModel");

const fs = require("fs");
const { ObjectId } = require("mongodb");
const path = require("path");

const createProject = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    const mainImageFile = req.files?.mainImage?.[0];
    const screenshotFiles = req.files?.screenshots || [];

    // Category names and captions sent as parallel arrays
    const categoryNames = req.body.categoryNames || [];
    const captions = req.body.captions || [];

    // Rebuild screenshots structure
    const categoriesMap = {};

    screenshotFiles.forEach((file, i) => {
      const category = categoryNames[i] || "General";
      const caption = captions[i] || "";

      if (!categoriesMap[category]) categoriesMap[category] = [];
      categoriesMap[category].push({
        id: new ObjectId().toString(),
        image: file.filename,
        caption,
      });
    });

    const screenshots = Object.entries(categoriesMap).map(
      ([category, items]) => ({
        id: new ObjectId().toString(), // id for the category group
        category,
        items, // siblings of category
      }),
    );

    const projectData = {
      name,
      type,
      description,
      image: mainImageFile?.filename || null,
      visibility: "visible",
      screenshots,
      createdAt: new Date(),
    };
    console.log("Project data", projectData);
    await addProject(projectData);

    res.status(201).json({
      message: "Project created successfully",
      data: projectData,
    });
  } catch (error) {
    console.error("Error in createProject:", error);
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

const updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProject = await getProjectById(id);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    /* ----------------------------------
       1️⃣ Update main fields
    ---------------------------------- */
    const { name, type, description, visibility } = req.body;

    const updateFields = {
      name,
      type,
      description,
      visibility,
    };

    /* ----------------------------------
       2️⃣ Main image update
    ---------------------------------- */
    if (req.files?.mainImage?.[0]) {
      const newMainImage = req.files.mainImage[0].filename;

      if (existingProject.image) {
        const oldPath = path.join(
          __dirname,
          "../uploads",
          existingProject.image,
        );
        fs.unlink(oldPath, () => {});
      }

      updateFields.image = newMainImage;
    }

    /* ----------------------------------
       3️⃣ Screenshot handling (FIXED)
    ---------------------------------- */
    if (req.files?.screenshots?.length > 0) {
      const captions = Array.isArray(req.body.captions)
        ? req.body.captions
        : [req.body.captions];

      const categories = Array.isArray(req.body.categories)
        ? req.body.categories
        : [req.body.categories];

      req.files.screenshots.forEach((file, idx) => {
        const category = categories[idx] || "Uncategorized";

        const newItem = {
          id: new ObjectId().toString(),
          image: file.filename,
          caption: captions[idx] || "",
        };

        const categoryIndex = existingProject.screenshots.findIndex(
          (s) => s.category === category,
        );

        if (categoryIndex !== -1) {
          existingProject.screenshots[categoryIndex].items.push(newItem);
        } else {
          existingProject.screenshots.push({
            id: new ObjectId().toString(),
            category,
            items: [newItem],
          });
        }
      });

      updateFields.screenshots = existingProject.screenshots;
    }

    /* ----------------------------------
       4️⃣ Update database
    ---------------------------------- */
    const result = await updateProject(id, updateFields);

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        message: "Project updated successfully",
        data: updateFields,
      });
    }

    res.status(400).json({ message: "No changes were made" });
  } catch (error) {
    console.error("UpdateProject error:", error);
    res.status(500).json({ message: "Failed to update project" });
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

    console.log("Received projectId:", projectId); // Log projectId
    console.log("Received visibilityStatus:", visibility);

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

const deleteProjectById = async (req, res) => {
  try {
    const result = await deleteProject(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error });
  }
};

module.exports = {
  createProject,
  getProject,
  getProjects,
  updateProjectById,
  updateProjectVisibility,
  deleteProjectById,
};
