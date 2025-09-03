const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");


const addCurrency = Joi.object({
  code: Joi.string().optional(), 
  currency: Joi.string().required().messages({
    "string.empty": "Currency code is required",
    "any.required": "Currency code is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Currency name is required",
    "any.required": "Currency name is required",
  }),
  flag: Joi.string().required().messages({
    "string.empty": "Flag code is required",
    "any.required": "Flag code is required",
  }),
  rate: Joi.string().required().messages({
    "number.base": "Rate must be a number",
    "any.required": "Rate is required",
  }),
  symbol: Joi.string().required().messages({
    "string.empty": "Currency symbol is required",
    "any.required": "Currency symbol is required",
  })

});


const updateCurrency = Joi.object({
  id: idParam.required().messages({
    "any.required": "Currency ID is required",
    "string.length": "Invalid Currency ID length",
  }),
  code: Joi.string().optional(), 
  currency: Joi.string().optional(),
  name: Joi.string().optional(),
  flag: Joi.string().optional(),
  rate: Joi.string().optional(),
  symbol: Joi.string().optional()
});


const getCurrencyById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const deleteCurrency = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


module.exports = {
  addCurrency,
  updateCurrency,
  getCurrencyById,
  deleteCurrency,  
};
