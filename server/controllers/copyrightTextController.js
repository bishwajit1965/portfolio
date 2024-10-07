const {
  addCopyright,
  getById,
  getCopyrightData,
  updateById,
  deleteById,
} = require("../models/copyrightModel");

const createCopyright = async (req, res) => {
  try {
    const copyrightText = req.body;
    const saveCopyright = await addCopyright(copyrightText);
    res.status(201).json({
      message: "Copyright text added successfully!",
      copyright: saveCopyright,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. failed to retrieve copyright data." });
  }
};

const getCopyrightDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const copyrightData = await getById(id);
    if (copyrightData) {
      res.status(200).json(copyrightData);
    } else {
      res.status(404).json({ message: "Copyright data not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error. Failed to retrieve copyright data.",
      error,
    });
  }
};
const getAllCopyrightData = async (req, res) => {
  try {
    const copyrightData = await getCopyrightData();
    if (copyrightData) {
      res.status(200).json(copyrightData);
    } else {
      res.status(404).json({ message: "Copyright data not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

const updateCopyrightDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const copyrightData = req.body;
    const result = await updateById(id, copyrightData);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Copyright data updated successfully!" });
    } else {
      res.status(404).json({ message: "Copyright data not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

const deleteCopyrightById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteById(id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Copyright data deleted successfully!" });
    } else {
      res.status(404).json({ message: "Copyright data not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createCopyright,
  getCopyrightDataById,
  getAllCopyrightData,
  updateCopyrightDataById,
  deleteCopyrightById,
};
