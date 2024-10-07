const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addInspirationalQuote = async (popularQuote, author) => {
  const db = getDB();
  const quote = await db
    .collection("inspirational-quote")
    .insertOne({ popularQuote, author });
  return quote;
};

const getInspirationalQuote = async (id) => {
  const db = getDB();
  const objectId = new ObjectId(id);
  try {
    const quote = await db
      .collection("inspirational-quote")
      .findOne({ _id: objectId });
    if (!quote) {
      throw new Error("Quote not found!");
    }
    return quote;
  } catch (error) {
    throw new Error(`Inspirational quotes not found ${error.message}`);
  }
};

const getInspirationalQuotes = async () => {
  const db = getDB();
  try {
    const quotes = await db.collection("inspirational-quote").find().toArray();
    return quotes.length ? quotes : null;
  } catch (error) {
    // Adding custom context while preserving the original error message
    throw new Error(`Inspirational quotes not found ${error.message}`);
  }
};

const updateInspirationalQuote = async (id, updateInspirationalData) => {
  const db = getDB();
  // Create a new ObjectId instance from the provided id
  const objectId = new ObjectId(id);
  try {
    // Remove the _id from updateData if it exists
    const { _id, ...updateFields } = updateInspirationalData;
    const result = await db
      .collection("inspirational-quote")
      .updateOne({ _id: objectId }, { $set: updateFields });
    if (result.matchedCount === 0) {
      throw new Error("Inspirational quote not deleted!");
    }
  } catch (error) {
    throw new Error(
      `Internal server error while deleting inspiration quote ${error.message}`
    );
  }
};

const deleteInspirationalQuote = async (id) => {
  const objectId = new ObjectId(id);
  console.log("Object ID", objectId);
  const db = getDB();
  try {
    const result = await db
      .collection("inspirational-quote")
      .deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new Error("Quote not found or already deleted");
    }
    return result;
  } catch (error) {
    // Improve error message by adding context
    throw new Error(
      `Internal server error while deleting quote: ${error.message}`
    );
  }
};

module.exports = {
  addInspirationalQuote,
  getInspirationalQuote,
  getInspirationalQuotes,
  updateInspirationalQuote,
  deleteInspirationalQuote,
};
