const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");


const addProductUnit = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Unit name is required",
    "any.required": "Unit name is required",
  }),
  code: Joi.string().required().messages({
    "string.empty": "Unit code is required",
    "any.required": "Unit code is required",
  }),
  type: Joi.string().optional().messages({
    "string.empty": "Unit type cannot be empty",
  }),
  description: Joi.string().optional(),
});


const updateProductUnit = Joi.object({
  id: idParam.required().messages({
    "any.required": "Product Unit ID is required",
    "string.length": "Invalid Product Unit ID length",
  }),
  name: Joi.string().optional(),
  code: Joi.string().optional(),
  type: Joi.string().optional(),
  description: Joi.string().optional(),
});


const getProductUnitById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const deleteProductUnit = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addProductUnit,
  updateProductUnit,
  getProductUnitById,
  deleteProductUnit,
};
