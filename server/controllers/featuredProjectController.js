const { ObjectId } = require("mongodb");
const featuredProject = require("../models/featuredProjectModel");

const createFeaturedProject = async (req, res) => {
  try {
    const projectData = req.body;
    const result = await featuredProject.create(projectData);
    console.log("REsult:", result);
    const createdProject = { ...projectData, _id: result.insertedId };
    console.log("Created project", createdProject);
    res.status(201).json({
      message: "Featured project created successfully.",
      result: createdProject,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFeaturedProject = async (req, res) => {
  try {
    const projectData = await featuredProject.getById(req.params.id);
    if (!projectData) {
      res.status(404).json({ message: "Featured project not found!" });
    }
    res.status(200).json(projectData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllFeaturedProjects = async (req, res) => {
  try {
    const projects = await featuredProject.getProjects();
    if (!projects) {
      res.status(404).json({ message: "Featured projects not found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateFeaturedProject = async (req, res) => {
  try {
    const projectData = req.body;
    const result = await featuredProject.updateById(req.params.id, projectData);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Featured project not found!" });
    }
    res.status(200).json({ message: "Featured project updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

const deleteFeaturedProject = async (req, res) => {
  try {
    const result = await featuredProject.deleteById(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Featured project not found!" });
    }
    res.status(200).json({ message: "Featured project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

module.exports = {
  createFeaturedProject,
  getFeaturedProject,
  getAllFeaturedProjects,
  updateFeaturedProject,
  deleteFeaturedProject,
};
