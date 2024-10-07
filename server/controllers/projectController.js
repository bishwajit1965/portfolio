const {
  addProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
} = require("../models/projectModel");

const fs = require("fs");
const path = require("path");

const createProject = async (req, res) => {
  try {
    const { name, type, description } = req.body;
    // Include the uploaded image path in the project data
    const image = req.file ? req.file.filename : null; // Assuming filename is used; adjust if using full path

    const projectData = {
      name,
      type,
      image,
      description,
    };
    // console.log(projectData);
    const result = await addProject(projectData);
    console.log("Result: ", result);
    res
      .status(201)
      .json({ message: "Project created successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
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
    const updateData = req.body;
    // Retrieve existing project data from database
    const existingProject = await getProjectById(id);
    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    // Update the image path if new image file is uploaded
    let imagePath = existingProject.image; // Default to the existing image path
    if (req.file) {
      imagePath = `../uploads/${req.file.filename}`; //Get the path of the newly uploaded image
      if (existingProject.image) {
        const previousImagePath = path.join(
          __dirname,
          "../uploads",
          existingProject.image
        );
        fs.unlink(previousImagePath, (err) => {
          if (err) {
            console.error("Error in deleting previous image", err);
          }
        });
      }
    }

    // Update the project data
    updateData.image = imagePath;
    const result = await updateProject(id, updateData);
    if (result.modifiedCount === 1) {
      res
        .status(200)
        .json({ message: "Project updated successfully", data: updateData });
    } else {
      res.status(400).json({
        message: "Failed to update project",
      });
    }
  } catch (error) {
    console.error("Error in updating project", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating project" });
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
  deleteProjectById,
};
