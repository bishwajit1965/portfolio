const {
  addInspirationalQuote,
  getInspirationalQuote,
  getInspirationalQuotes,
  updateInspirationalQuote,
  deleteInspirationalQuote,
} = require("../models/inspirationalQuoteModel");

const createInspirationalQuote = async (req, res) => {
  try {
    const { popularQuote, author } = req.body;
    const quote = await addInspirationalQuote(popularQuote, author);
    res.status(201).json({
      message: "Inspirational quote saved successfully!",
      data: quote,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save inspirational quote." });
  }
};

const getInspirationalQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await getInspirationalQuote(id);
    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json({ message: "Inspirational quote not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllInspirationalQuotes = async (req, res) => {
  try {
    const quotes = await getInspirationalQuotes();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const updateInspirationalQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateInspirationalData = req.body;
    const result = await updateInspirationalQuote(id, updateInspirationalData);
    res.status(200).json({
      message: "Inspirational data updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!", error });
  }
};

const deleteInspirationalQuoteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteInspirationalQuote(id);
    res
      .status(200)
      .json({ message: "Inspirational quote deleted successfully!" });
  } catch (error) {
    res.status(404).json({ message: "Inspirational quote not found!" });
  }
};

module.exports = {
  createInspirationalQuote,
  getInspirationalQuoteById,
  getAllInspirationalQuotes,
  updateInspirationalQuoteById,
  deleteInspirationalQuoteById,
};
