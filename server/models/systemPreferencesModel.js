const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addSystemPreferences = async (systemPreferencesData) => {
  try {
    const db = getDB();
    const existing = await db.collection("systemPreferences").findOne();
    if (existing) {
      throw new Error("System preferences already exist.");
    }
    const result = await db
      .collection("systemPreferences")
      .insertOne(systemPreferencesData);

    if (!result.acknowledged || !result.insertedId) {
      throw new Error("Failed to insert system preferences data.");
    }
    return {
      success: true,
      insertedId: result.insertedId,
    };
  } catch (error) {
    throw new Error(error.message || "Database error");
  }
};

// Get single blog post
const getSystemPreferenceById = async (id) => {
  try {
    const db = getDB();
    const systemPreference = await db
      .collection("systemPreferences")
      .findOne({ _id: new ObjectId(id) });
    return systemPreference;
  } catch (error) {
    throw new Error("No system preferences found", error.message);
  }
};

// Fetches system preferences for super-admin dashboard
const getSystemPreferences = async () => {
  try {
    const db = getDB();
    const systemPreferences = await db
      .collection("systemPreferences")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return systemPreferences;
  } catch (error) {
    throw new Error(error.message || "Database error");
  }
};

// Update system preferences
const updateSystemPreferences = async (id, updateData) => {
  const db = getDB();

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid system preferences ID.");
  }

  const objectId = new ObjectId(id);

  const existingSystemPreferences = await db
    .collection("systemPreferences")
    .findOne({ _id: objectId });

  if (!existingSystemPreferences) {
    throw new Error("System preferences not found.");
  }

  const { _id, ...updateFields } = updateData;

  const result = await db.collection("systemPreferences").updateOne(
    { _id: objectId },
    {
      $set: updateFields,
    },
  );

  return {
    success: result.matchedCount > 0,
    modifiedCount: result.modifiedCount,
  };
};

const removeSystemPreferences = async (id) => {
  const db = getDB();

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid system preferences ID.");
  }

  const objectId = new ObjectId(id);

  const result = await db.collection("systemPreferences").deleteOne({
    _id: objectId,
  });

  return {
    success: result.deletedCount > 0,
    deletedCount: result.deletedCount,
  };
};

module.exports = {
  addSystemPreferences,
  getSystemPreferenceById,
  getSystemPreferences,
  updateSystemPreferences,
  removeSystemPreferences,
};
