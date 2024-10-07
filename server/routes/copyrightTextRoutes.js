const express = require("express");

const {
  createCopyright,
  getCopyrightDataById,
  getAllCopyrightData,
  updateCopyrightDataById,
  deleteCopyrightById,
} = require("../controllers/copyrightTextController");

const {
  validateCopyrightMiddlewareRules,
  validate,
  validateCopyrightById,
} = require("../middlewares/validateCopyrightTextData");

const router = express.Router();

router.post("/", validateCopyrightMiddlewareRules(), validate, createCopyright);
router.get("/", getAllCopyrightData);
router.get("/:id", validateCopyrightById, getCopyrightDataById);
router.patch(
  "/:id",
  validateCopyrightMiddlewareRules(),
  validate,
  updateCopyrightDataById
);
router.delete("/:id", validateCopyrightById, deleteCopyrightById);

module.exports = router;
