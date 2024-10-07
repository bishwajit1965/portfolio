const {
  addSocialLink,
  getSocialLinkById,
  getAllSocialLinks,
  updateSocialLink,
  deleteSocialLink,
} = require("../models/socialLinksModel");

const createSocialLinks = async (req, res) => {
  const { platform, url, icon } = req.body;
  // Validate
  if (!platform || !url || !icon) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const saveSocialLinks = await addSocialLink(platform, url, icon);
    res.status(201).json({
      message: "Social links data inserted successfully",
      saveSocialLinks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send social links", error });
  }
};

const getSocialLink = async (req, res) => {
  const id = req.params;
  try {
    const socialLink = await getSocialLinkById(id);
    if (socialLink) {
      res.status(200).json(socialLink);
    } else {
      frames.status(400).json({ message: "Social link data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve social link data" });
  }
};

const socialLinks = async (req, res) => {
  try {
    const allSocialLinks = await getAllSocialLinks();
    if (allSocialLinks) {
      res.status(200).json(allSocialLinks);
    } else {
      res.status(400).json({ message: "Social links data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve social links data" });
  }
};

const updateSocialLinkById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateSocialLink(id, req.body);
    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Social link updated successfully." });
    } else {
      res.status(404).json({ message: "Social link data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update social link data." });
  }
};

const deleteSocialLinkById = async (req, res) => {
  const id = req.params;
  try {
    const result = await deleteSocialLink(id);
    if (result) {
      res
        .status(200)
        .json({ message: "Social link data deleted successfully." });
    } else {
      res.status(404).json({ message: "Social link data not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete social link data." });
  }
};

module.exports = {
  createSocialLinks,
  getSocialLink,
  socialLinks,
  updateSocialLinkById,
  deleteSocialLinkById,
};
