const express = require("express");

const {
  createHobby,
  getHobby,
  getAllHobbies,
  updateHobby,
  deleteHobby,
} = require("../controllers/hobbyController");

const {
  hobbyValidationRules,
  validate,
} = require("../middlewares/validateHobbyData");

const router = express.Router();

router.post("/", hobbyValidationRules(), validate, createHobby);
router.get("/:id", getHobby);
router.get("/", getAllHobbies);
router.patch("/:id", hobbyValidationRules(), validate, updateHobby);
router.delete("/:id", deleteHobby);

module.exports = router;
