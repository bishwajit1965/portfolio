const {
  addMessage,
  getContactById,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../models/contactModel");

const createMessage = async (req, res) => {
  try {
    const messageData = req.body;
    const savedMessage = await addMessage(messageData);
    res
      .status(201)
      .json({ message: "Message sent successfully", message: savedMessage });
  } catch (error) {
    res.status(500).json({ message: "Failed to send contact message", error });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact message not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve contact message.", error });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve contact messages.".error,
    });
  }
};

const updateContactById = async (req, res) => {
  try {
    const result = await updateContact(req.params.id, req.body);
    if (result.matchedCount > 0) {
      res
        .status(200)
        .json({ message: "Contact message updated successfully.", result });
    } else {
      res.status(404).json({ message: "Project not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const result = await deleteContact(req.params.id);
    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: "Contact message is deleted successfully." });
    } else {
      res.status(404).json({ message: "Contact message not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact message." });
  }
};

module.exports = {
  createMessage,
  getContact,
  getContacts,
  updateContactById,
  deleteContactById,
};
