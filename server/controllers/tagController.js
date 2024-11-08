const {
  createTag,
  findTagByName,
  getAllTags,
  updateTag,
  deleteTag,
} = require("../models/tagModel");

const addTag = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "Tag name is required." });
  }

  const newTag = {
    name: name,
    createdAt: new Date(),
  };
  try {
    // Step 2: Check if the category already exists
    const existingTag = await findTagByName(name);

    if (existingTag) {
      return res.status(400).json({ message: "Tag already exists." });
    }
    const result = await createTag(newTag);
    res
      .status(201)
      .json({ message: "Tag created successfully.", tagId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create tag." });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res, status(500).json({ message: "Error in fetching tags." });
  }
};

const updateTagById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    console.log("Received ID for update:", id);
    console.log("Updated Data:", updatedData);

    const updatedTag = await updateTag(id, updatedData);

    if (updatedTag.modifiedCount > 0) {
      console.log("Tag updated successfully.");
      res.status(200).json({
        message: "Tag updated successfully!",
        updatedTag,
      });
    } else {
      console.log("No tag updated, document not found.");
      res.status(400).json({ message: "Tag data not found." });
    }
  } catch (error) {
    console.error("Error in updating tag:", error);
    res.status(500).json({ message: "Error in updating tag.", error });
  }
};

const deleteTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTag = await deleteTag(id);
    if (deletedTag.deletedCount > 0) {
      res.status(200).json({ message: "Tag deleted" });
    } else {
      res.status(400).json({ message: "Tag not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

module.exports = { addTag, getTags, updateTagById, deleteTagById };
