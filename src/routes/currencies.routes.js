const express = require('express');
const validate = require("../middlewares/validation.middleware");
const currenciesController = require("../controllers/currencies.controllers");
const { 
  addCurrency, 
  updateCurrency, 
  getCurrencyById, 
  deleteCurrency 
} = require("../validations/currencies.validations.js");

const router = express.Router();

router.post('/add', validate(addCurrency), currenciesController.add);

router.post('/update', validate(updateCurrency), currenciesController.update);

router.get('/getById/:id', validate(getCurrencyById), currenciesController.getById);

router.get('/getAll', currenciesController.getAll);

router.delete('/:id', validate(deleteCurrency), currenciesController.remove);

module.exports = router;

