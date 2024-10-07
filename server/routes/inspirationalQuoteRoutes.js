const express = require("express");

const {
  createInspirationalQuote,
  getInspirationalQuoteById,
  getAllInspirationalQuotes,
  updateInspirationalQuoteById,
  deleteInspirationalQuoteById,
} = require("../controllers/inspirationalQuoteController");

const {
  validateInspIrationalQuoteData,
  validateInspirationalQuoteById,
} = require("../middlewares/validateInspIrationalQuotesData");

const router = express.Router();

router.post("/", validateInspIrationalQuoteData, createInspirationalQuote);
router.get("/:id", validateInspirationalQuoteById, getInspirationalQuoteById);
router.get("/", getAllInspirationalQuotes);
router.patch(
  "/:id",
  validateInspirationalQuoteById,
  updateInspirationalQuoteById
);
router.delete(
  "/:id",
  validateInspirationalQuoteById,
  deleteInspirationalQuoteById
);

module.exports = router;
