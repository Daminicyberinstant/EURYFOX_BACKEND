const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

// Schema for a single quantity object
const quantitySchema = Joi.object({
  value: Joi.string().required().messages({
    "string.empty": "Quantity value is required",
    "any.required": "Quantity value is required",
  }),
  label: Joi.string().required().messages({
    "string.empty": "Quantity label is required",
    "any.required": "Quantity label is required",
  }),
  multiplier: Joi.number().required().messages({
    "number.base": "Multiplier must be a number",
    "any.required": "Multiplier is required",
  }),
});

// Add Unit Quantities
const addUnitQuantities = Joi.object({
  unitId: idParam.required().messages({
    "any.required": "Unit ID is required",
    "string.length": "Invalid Unit ID length",
  }),
  quantities: Joi.array().items(quantitySchema).min(1).required().messages({
    "array.base": "Quantities must be an array",
    "array.min": "At least one quantity is required",
    "any.required": "Quantities are required",
  }),
});


const updateUnitQuantities = Joi.object({
  id: idParam.required().messages({
    "any.required": "UnitQuantities ID is required",
    "string.length": "Invalid UnitQuantities ID length",
  }),
   unitId: idParam.optional().messages({
    "any.required": "Unit ID is required",
    "string.length": "Invalid Unit ID length",
  }),
  quantities: Joi.array().items(quantitySchema).min(1).optional().messages({
    "array.base": "Quantities must be an array",
    "array.min": "At least one quantity is required",
  }),
});


const getUnitQuantitiesById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const deleteUnitQuantities = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});



module.exports = {
  addUnitQuantities,
  updateUnitQuantities,
  getUnitQuantitiesById,
  deleteUnitQuantities,
};
