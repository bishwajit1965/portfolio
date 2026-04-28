// Constant for Cloudinary path
const appLogoPath = process.env.PORTFOLIO_LOGO_PATH || "portfolio_logo";
const path = require("path");
// Utility function for image uploading
const { uploadImage, deleteImage } = require("../utils/upload.service");
const systemPreferenceFieldsConfig = require("../systemPreferenceFieldsConfig/systemPreferenceFieldsConfig");

const {
  addSystemPreferences,
  getSystemPreferenceById,
  getSystemPreferences,
  updateSystemPreferences,
  removeSystemPreferences,
} = require("../models/systemPreferencesModel");

const insertSystemPreferences = async (req, res) => {
  try {
    const { appName } = req.body;

    if (!appName) {
      return res.status(400).json({
        success: false,
        message: "App name is required!",
      });
    }

    const now = new Date();

    const systemPreferencesData = {};

    systemPreferenceFieldsConfig.forEach((field) => {
      if (req.body[field] !== undefined) {
        systemPreferencesData[field] = req.body[field];
      }
    });

    systemPreferencesData.createdAt = now;
    systemPreferencesData.updatedAt = now;

    if (req.file) {
      const uploaded = await uploadImage(req.file, appLogoPath);

      systemPreferencesData.imageUrl = uploaded.url;
      systemPreferencesData.publicId = uploaded.public_id;
    }

    const newPortfolioPreference = await addSystemPreferences(
      systemPreferencesData,
    );

    return res.status(201).json({
      success: true,
      message: "Portfolio preferences created successfully",
      data: newPortfolioPreference,
    });
  } catch (error) {
    if (error.message === "System preferences already exist.") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error!",
    });
  }
};
// const insertSystemPreferences = async (req, res) => {
//   try {
//     const { appName } = req.body;
//     if (!appName)
//       return res
//         .status(400)
//         .json({ success: false, message: "App name is required!" });

//     const now = new Date();
//     const systemPreferencesData = {
//       ...req.body,
//       createdAt: now,
//       updatedAt: now,
//     };

//     console.log("REQ>>>BODY", systemPreferencesData);

//     if (req.file) {
//       const uploaded = await uploadImage(req.file, appLogoPath);
//       systemPreferencesData.imageUrl = uploaded.url;
//       systemPreferencesData.publicId = uploaded.public_id;
//     }

//     const newPortfolioPreference = await addSystemPreferences(
//       systemPreferencesData,
//     );
//     console.log("New Preferences", newPortfolioPreference);
//     return res.status(201).json({
//       success: true,
//       message: "Portfolio preferences created successfully",
//       data: newPortfolioPreference,
//     });
//   } catch (error) {
//     if (error.message === "System preferences already exist.") {
//       return res.status(409).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error!",
//     });
//   }
// };

// Fetches all system preferences for super-admin dashboard
const fetchSystemPreferences = async (req, res) => {
  try {
    console.log("✅ Blog post for admin is hit:");
    const systemPreferences = await getSystemPreferences();
    console.log("Response :", systemPreferences);

    return res.status(200).json({
      success: true,
      message: "System preferences fetched successfully!",
      data: systemPreferences,
      totalRows: systemPreferences.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error!",
    });
  }
};

// Edit system preferences
const editSystemPreferences = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSystemPreference = await getSystemPreferenceById(id);

    if (!existingSystemPreference) {
      return res.status(404).json({
        success: false,
        message: "System preferences not found",
      });
    }

    let updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    if (req.file) {
      const uploaded = await uploadImage(req.file, appLogoPath);

      if (existingSystemPreference.publicId) {
        await deleteImage(existingSystemPreference.publicId);
      }

      updateData.imageUrl = uploaded.url;
      updateData.publicId = uploaded.public_id;
    }

    const result = await updateSystemPreferences(id, updateData);

    if (!result?.success) {
      throw new Error("Failed to update system preferences");
    }

    return res.status(200).json({
      success: true,
      message: "System preferences updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Error updating system preferences",
    });
  }
};

const deleteSystemPreferences = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSystemPreference = await getSystemPreferenceById(id);

    if (!existingSystemPreference) {
      return res.status(404).json({
        success: false,
        message: "System preferences not found",
      });
    }

    // delete image from Cloudinary
    if (existingSystemPreference.publicId) {
      await deleteImage(existingSystemPreference.publicId);
    }

    // delete from database
    const result = await removeSystemPreferences(id);

    if (!result?.success) {
      throw new Error("Failed to delete system preferences");
    }

    return res.status(200).json({
      success: true,
      message: "System preferences deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting system preferences",
    });
  }
};

module.exports = {
  insertSystemPreferences,
  fetchSystemPreferences,
  editSystemPreferences,
  deleteSystemPreferences,
};
