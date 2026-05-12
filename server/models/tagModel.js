const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

// Insert a new tag
const createTag = async (tagData) => {
  try {
    const db = getDB();
    const result = await db.collection("tags").insertOne(tagData);
    return result;
  } catch (error) {
    console.error("Error in inserting tag.", error.message);
    throw new Error("Error in inserting tag." + error.message);
  }
};

const findTagByName = async (name) => {
  try {
    const db = getDB();
    const tag = db.collection("tags").findOne({ name });
    return tag;
  } catch (error) {
    throw new Error("Error in finding tag" + error.message);
  }
};

const getAllTags = async () => {
  try {
    const db = getDB();
    const result = await db.collection("tags").find({}).toArray();
    return result;
  } catch (error) {
    console.error("Error in fetching tags data.", error.message);
    throw new Error("Error encountered wile inserting tag." + error.message);
  }
};

const updateTag = async (id, updatedCategoryData) => {
  try {
    const db = getDB();
    const objectId = new ObjectId(id);
    const { _id, ...updatedCategory } = updatedCategoryData;

    const result = await db
      .collection("tags")
      .updateOne(
        { _id: objectId },
        { $set: { name: updatedCategory.name, updatedAt: new Date() } },
      );

    return result;
  } catch (error) {
    throw new Error("Error in updating tag: " + error.message);
  }
};

const deleteTag = async (id) => {
  try {
    const db = getDB();
    const objectId = new ObjectId(id);
    const result = await db.collection("tags").deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      console.log("Tag deleted.");
    }
  } catch (error) {
    console.error("Tag is not deleted.");
  }
};

module.exports = { createTag, findTagByName, getAllTags, updateTag, deleteTag };
