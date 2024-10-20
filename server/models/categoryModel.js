const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

const createCategory = async (name) => {
  const newCategory = { name, createdAt: new Date() };
  try {
    const db = getDB();
    const result = await db.collection("categories").insertOne(newCategory);
    return { _id: result.insertedId, ...newCategory };
  } catch (error) {
    throw new Error("Error in creating category" + error.message);
  }
};

const findCategoryByName = async (name) => {
  try {
    const db = getDB();
    const category = db.collection("categories").findOne({ name });
    return category;
  } catch (error) {
    throw new Error("Error in finding category" + error.message);
  }
};

const getAllCategories = async () => {
  try {
    const db = getDB();
    const result = db.collection("categories").find({}).toArray();
    return result;
  } catch (error) {
    throw new Error("Error in fetching categories" + error.message);
  }
};

const updateCategory = async (id, updatedCategoryData) => {
  try {
    const db = getDB();
    const objectId = new ObjectId(id);
    const { _id, ...updatedCategory } = updatedCategoryData;

    console.log("Updating category with ObjectId:", objectId);
    console.log("Update data:", updatedCategory);

    const result = await db
      .collection("categories")
      .updateOne(
        { _id: objectId },
        { $set: { name: updatedCategory.name, updatedAt: new Date() } }
      );

    console.log("MongoDB update result:", result);
    return result;
  } catch (error) {
    throw new Error("Error in updating category: " + error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const db = getDB();
    const objectId = new ObjectId(id);
    const result = await db
      .collection("categories")
      .deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      console.log("Category deleted.");
    }
  } catch (error) {
    console.error("Category is not deleted.");
  }
};

module.exports = {
  findCategoryByName,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
