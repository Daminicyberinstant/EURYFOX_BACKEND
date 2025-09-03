const express = require("express");
const validate = require("../middlewares/validation.middleware");
const unitQuantitiesController = require("../controllers/unitQuantities.controllers");
const {
  addUnitQuantities,
  updateUnitQuantities,
  getUnitQuantitiesById,
  deleteUnitQuantities,
} = require("../validations/unitQuantities.validations");

const router = express.Router();

router.post("/add", validate(addUnitQuantities), unitQuantitiesController.add);

router.post("/update", validate(updateUnitQuantities), unitQuantitiesController.update);

router.get("/getById/:id", validate(getUnitQuantitiesById), unitQuantitiesController.getById);

router.get("/getAll", unitQuantitiesController.getAll);


router.delete("/:id", validate(deleteUnitQuantities), unitQuantitiesController.remove);

module.exports = router;
