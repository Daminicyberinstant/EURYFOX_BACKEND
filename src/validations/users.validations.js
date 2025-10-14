const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addUser = Joi.object({
  fullName: Joi.string().optional().trim().messages({
    "string.min": "Full name must be at least 2 characters long",
    "string.max": "Full name cannot exceed 100 characters",
  }),
  emailAddress: Joi.string().email().required().trim().messages({
    "string.empty": "Email address is required",
    "string.email": "Email address must be a valid email",
    "any.required": "Email address is required",
  }),
  mobileNumber: Joi.string().optional().allow('').trim().messages({
    "string.min": "Mobile number must be at least 5 characters long",
    "string.max": "Mobile number cannot exceed 20 characters",
  }),
  address: Joi.string().optional().allow('').trim().messages({
    "string.min": "Address must be at least 5 characters long",
    "string.max": "Address cannot exceed 200 characters",
  }),
});

const updateUser = Joi.object({
  id: idParam.required().messages({
    "any.required": "User ID is required",
    "string.length": "Invalid User ID length",
  }),
  fullName: Joi.string().optional().trim().allow('').messages({
    "string.min": "Full name must be at least 2 characters long",
    "string.max": "Full name cannot exceed 100 characters",
  }),
  emailAddress: Joi.string().email().optional().trim().messages({
    "string.email": "Email address must be a valid email",
  }),
  mobileNumber: Joi.string().optional().allow('').trim().messages({
    "string.min": "Mobile number must be at least 5 characters long",
    "string.max": "Mobile number cannot exceed 20 characters",
  }),
  address: Joi.string().optional().allow('').trim().messages({
    "string.min": "Address must be at least 5 characters long",
    "string.max": "Address cannot exceed 200 characters",
  }),
});

const getUserById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteUser = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const getUserByEmail = Joi.object({
  params: Joi.object({
    email: Joi.string().email().required().trim().messages({
      "string.empty": "Email address is required",
      "string.email": "Email address must be a valid email",
      "any.required": "Email address is required",
    }),
  }),
});

module.exports = {
  addUser,
  updateUser,
  getUserById,
  deleteUser,
  getUserByEmail,
};
