const express = require("express");
const {
  createMessage,
  getContact,
  getContacts,
  updateContactById,
  deleteContactById,
} = require("../controllers/contactController");

const validateContactData = require("../middlewares/validateContactData");

const router = express.Router();

router.post("/", validateContactData, createMessage);
router.get("/:id", getContact);
router.get("/", getContacts);
router.patch("/:id", validateContactData, updateContactById);
router.delete("/:id", deleteContactById);

module.exports = router;
