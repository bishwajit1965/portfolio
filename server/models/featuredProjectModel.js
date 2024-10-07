const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const featuredProject = {
  create: async (projectData) => {
    const db = getDB();
    return await db.collection("featured-projects").insertOne(projectData);
  },

  getById: async (id) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db.collection("featured-projects").findOne({ _id: objectId });
  },

  getProjects: async () => {
    const db = getDB();
    return await db.collection("featured-projects").find().toArray();
  },

  updateById: async (id, projectData) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db
      .collection("featured-projects")
      .updateOne({ _id: objectId }, { $set: projectData });
  },

  deleteById: async (id) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db
      .collection("featured-projects")
      .deleteOne({ _id: objectId });
  },
};

module.exports = featuredProject;
