const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const phonePattern = /^\+?[0-9-]{7,25}$/;

const addContactInfo = Joi.object({
  mobileNumber: Joi.string()
    .pattern(phonePattern)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base": "Mobile number must be a valid number with 7-15 digits",
      "any.required": "Mobile number is required",
    }),
  infoEmail: Joi.string().email().required().messages({
    "string.email": "Info email must be a valid email",
    "any.required": "Info email is required",
  }),
  salesEmail: Joi.string().email().required().messages({
    "string.email": "Sales email must be a valid email",
    "any.required": "Sales email is required",
  }),
  supportEmail: Joi.string().email().required().messages({
    "string.email": "Support email must be a valid email",
    "any.required": "Support email is required",
  }),
  officeAddress: Joi.array().items(Joi.string().min(2)).required(),
  phoneNumbers: Joi.array().items(Joi.string().pattern(phonePattern)).required(),
  emails: Joi.array().items(Joi.string().email()).required(),
  businessHours: Joi.array().items(Joi.string().min(2)).required(),
  latitude: Joi.number().required().messages({
    "number.base": "Latitude must be a number",
    "any.required": "Latitude is required",
  }),
  longitude: Joi.number().required().messages({
    "number.base": "Longitude must be a number",
    "any.required": "Longitude is required",
  }),
  isActive: Joi.boolean().optional(),
});


const updateContactInfo = Joi.object({
  id: idParam.required().messages({
    "any.required": "Contact info ID is required",
    "string.length": "Invalid contact info ID length",
  }),
  mobileNumber: Joi.string().pattern(phonePattern).optional(),
  infoEmail: Joi.string().email().optional(),
  salesEmail: Joi.string().email().optional(),
  supportEmail: Joi.string().email().optional(),
  officeAddress: Joi.array().items(Joi.string().min(2)).optional(),
  phoneNumbers: Joi.array().items(Joi.string().pattern(phonePattern)).optional(),
  emails: Joi.array().items(Joi.string().email()).optional(),
  businessHours: Joi.array().items(Joi.string().min(2)).optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  isActive: Joi.boolean().optional(),
});


const getContactInfoById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const deleteContactInfo = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const getActiveContactInfo = Joi.object({});

module.exports = {
  addContactInfo,
  updateContactInfo,
  getContactInfoById,
  deleteContactInfo,
  getActiveContactInfo,
};
