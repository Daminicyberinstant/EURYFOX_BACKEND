const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addTeamMember = Joi.object({
  name: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Team member name is required",
    "string.min": "Team member name must be at least 2 characters long",
    "string.max": "Team member name cannot exceed 100 characters",
    "any.required": "Team member name is required",
  }),
  role: Joi.string().min(2).max(50).required().trim().messages({
    "string.empty": "Role is required",
    "string.min": "Role must be at least 2 characters long",
    "string.max": "Role cannot exceed 50 characters",
    "any.required": "Role is required",
  }),
image: Joi.any(),
  description: Joi.string().min(10).max(500).required().trim().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters",
    "any.required": "Description is required",
  }),
  isActive: Joi.boolean().optional(),
});

const updateTeamMember = Joi.object({
  id: idParam.required().messages({
    "any.required": "Team member ID is required",
    "string.length": "Invalid Team member ID length",
  }),
  name: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Team member name must be at least 2 characters long",
    "string.max": "Team member name cannot exceed 100 characters",
  }),
  role: Joi.string().min(2).max(50).optional().trim().messages({
    "string.min": "Role must be at least 2 characters long",
    "string.max": "Role cannot exceed 50 characters",
  }),
image: Joi.any(),
  description: Joi.string().min(10).max(500).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters",
  }),
  isActive: Joi.boolean().optional(),
});

const getTeamMemberById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const deleteTeamMember = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addTeamMember,
  updateTeamMember,
  getTeamMemberById,
  deleteTeamMember,
};
