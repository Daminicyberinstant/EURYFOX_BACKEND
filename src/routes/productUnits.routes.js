const express = require('express');
const validate = require("../middlewares/validation.middleware");
const productUnitsController = require("../controllers/productUnits.controllers");
const { 
  addProductUnit, 
  updateProductUnit, 
  getProductUnitById, 
  deleteProductUnit 
} = require("../validations/productUnits.validations");

const router = express.Router();

router.post('/add', validate(addProductUnit), productUnitsController.add);

router.post('/update', validate(updateProductUnit), productUnitsController.update);

router.get('/getById/:id', validate(getProductUnitById), productUnitsController.getById);

router.get('/getAll', productUnitsController.getAll);


router.delete('/:id', validate(deleteProductUnit), productUnitsController.remove);

module.exports = router;
