const hobby = require("../models/hobbyModel");

const createHobby = async (req, res) => {
  try {
    const hobbyData = req.body;
    const result = await hobby.create(hobbyData);
    const createdHobby = { ...hobbyData, _id: result.insertedId };
    res
      .status(201)
      .json({ message: "Hobby created successfully!", hobby: createdHobby });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

const getHobby = async (req, res) => {
  try {
    const hobbyData = await hobby.getById(req.params.id);
    if (!hobbyData) {
      return res.status(404).json({ message: "Hobby not found!" });
    }
    res.status(200).json(hobbyData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllHobbies = async (req, res) => {
  try {
    const hobbies = await hobby.getHobbies();
    if (!hobbies) {
      res.statue(404).json({ message: "Hobbies not found!" });
    }
    res.status(200).json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateHobby = async (req, res) => {
  try {
    const hobbyData = req.body;
    const result = await hobby.updateById(req.params.id, hobbyData);
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Hobby not found or no changes made! " });
    }
    res.status(200).json({ message: "Hobby updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteHobby = async (req, res) => {
  try {
    const result = await hobby.deleteById(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Hobby not found!" });
    }
    res.status(200).json({ message: "Hobby deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createHobby,
  getHobby,
  getAllHobbies,
  updateHobby,
  deleteHobby,
};
