const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

const addProject = async (projectData) => {
  try {
    const db = getDB();
    const result = await db.collection("projects").insertOne(projectData);
    if (result.acknowledged && result.insertedId) {
      return { success: true, insertedId: result.insertedId };
    } else {
      throw new Error("Failed to insert project data");
    }
  } catch (error) {
    console.error("Error adding project to database", error.message);
    return { success: false, error: error.message };
  }
};

const getProjectById = async (id) => {
  const db = getDB();
  const project = await db
    .collection("projects")
    .findOne({ _id: new ObjectId(id) });
  return project;
};

const getAllProjects = async () => {
  const db = getDB();
  const projects = await db.collection("projects").find().toArray();
  return projects;
};

// Update project safely
const updateProject = async (id, updateData) => {
  const db = getDB();
  const objectId = new ObjectId(id);

  const existingProject = await db
    .collection("projects")
    .findOne({ _id: objectId });
  if (!existingProject) throw new Error("Project not found");

  // Do NOT handle filesystem here
  // Model only updates DB
  return db
    .collection("projects")
    .updateOne({ _id: objectId }, { $set: updateData });
};

const toggleProjectVisibility = async (projectId, visibilityStatus) => {
  try {
    const db = getDB();

    // Check if projectId is a valid ObjectId
    if (!ObjectId.isValid(projectId)) {
      return { success: false, message: "Invalid project ID format" };
    }
    const objectId = new ObjectId(projectId);

    const result = await db
      .collection("projects")
      .updateOne({ _id: objectId }, { $set: { visibility: visibilityStatus } });

    if (result.modifiedCount === 1) {
      const updatedProject = await db
        .collection("projects")
        .findOne({ _id: objectId });
      return {
        success: true,
        message: "Project updated successfully",
        data: updatedProject,
      };
    } else {
      return {
        success: false,
        message: "Project not found or no changes made.",
      };
    }
  } catch (error) {
    console.error("Error in updating project visibility");
    return { success: false, message: "Error in updating project visibility" };
  }
};

const deleteProject = async (id) => {
  const db = getDB();
  const result = await db
    .collection("projects")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  addProject,
  getProjectById,
  getAllProjects,
  updateProject,
  toggleProjectVisibility,
  deleteProject,
};
