const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addSkills = async (skillName, level, experience, tools, category) => {
  try {
    const db = getDB();
    // Ensure tools is an array
    if (!Array.isArray(tools)) {
      throw new Error("Tools must e an array");
    }
    // Ensure category is array
    if (!Array.isArray(category)) {
      throw new Error("Category must be an array");
    }
    const result = await db
      .collection("skills")
      .insertOne({ skillName, level, experience, tools, category });
    if (result.acknowledged && result.insertedId) {
      return { success: true, insertedId: result.insertedId };
    }
  } catch (error) {
    console.error("Error in adding data to database.", error.message);
    return error;
  }
};

const getSkillsById = async (id) => {
  try {
    const db = getDB();
    const skill = await db
      .collection("skills")
      .findOne({ _id: new ObjectId(id) });

    if (!skill) {
      throw new Error("Skills data not found");
    }
    return skill;
  } catch (error) {
    console.error("Error in fetching skills by id");
    throw error; //Re-throw the error to be handled by the calling function
  }
};

const getAllSkills = async () => {
  try {
    const db = getDB();
    const skills = await db
      .collection("skills")
      .find(
        {},
        {
          projection: {
            _id: 1,
            skillName: 1,
            level: 1,
            experience: 1,
            tools: 1,
            category: 1,
          },
        }
      )
      .toArray();
    //   Check if any skills is found
    if (!skills || skills.length === 0) {
      throw new Error("No skills found!");
    }
    return skills;
  } catch (error) {
    console.error("Error in fetching skills!", error.message);
    throw new Error("Failed to fetch skills from database");
  }
};

const updateSkills = async (id, updateSkillsData) => {
  try {
    const db = getDB();
    const objectId = new ObjectId(id);
    const { _id, ...updateFields } = updateSkillsData;
    const result = await db
      .collection("skills")
      .updateOne({ _id: objectId }, { $set: updateFields });
    return result;
  } catch (error) {
    console.error("Skills data not updated", error);
  }
};

const deleteSkills = async (id) => {
  try {
    const db = getDB();
    if (!ObjectId.isValid(id)) {
      throw Error("Invalid skills ID");
    }
    const result = await db
      .collection("skills")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error in deleting skills", error.message);
    throw new Error("An error occurred while deleting skills");
  }
};

module.exports = {
  addSkills,
  getSkillsById,
  getAllSkills,
  updateSkills,
  deleteSkills,
};
