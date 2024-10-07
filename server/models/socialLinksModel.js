const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addSocialLink = async (platform, url, icon) => {
  try {
    const db = getDB();
    const result = await db
      .collection("socialLinks")
      .insertOne({ platform, url, icon });
    if (result.acknowledged && result.insertedId) {
      return { success: true, insertedId: result.insertedId };
    }
    return result;
  } catch (error) {
    console.error("Error in adding social links", error.message);
    return error;
  }
};

const getSocialLinkById = async (id) => {
  try {
    const db = getDB();
    const socialLink = await db
      .collection("socialLinks")
      .findOne({ _id: new ObjectId(id) });
    if (!socialLink) {
      throw new Error("Social links data not found");
    }
    return socialLink;
  } catch (error) {
    console.error("Error in fetching social link.");
    throw error;
  }
};

const getAllSocialLinks = async () => {
  const db = getDB();
  const socialLinks = await db.collection("socialLinks").find().toArray();
  return socialLinks;
};

const updateSocialLink = async (id, updateSocialLink) => {
  const db = getDB();
  const objectId = new ObjectId(id);
  // Remove the _id from the provided id
  const { _id, ...updateFields } = updateSocialLink;
  const result = await db
    .collection("socialLinks")
    .updateOne({ _id: objectId }, { $set: updateFields });
  return result;
};

const deleteSocialLink = async (id) => {
  const db = getDB();
  const result = await db
    .collection("socialLinks")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  addSocialLink,
  getSocialLinkById,
  getAllSocialLinks,
  updateSocialLink,
  deleteSocialLink,
};
