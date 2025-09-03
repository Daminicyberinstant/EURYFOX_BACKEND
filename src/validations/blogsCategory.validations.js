const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addBlogsCategory = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Blog category name is required",
    "any.required": "Blog category name is required",
  }),
  category: Joi.string().optional(),
  isActive: Joi.boolean().optional(), // optional because default is true
});

const updateBlogsCategory = Joi.object({
  id: idParam.required().messages({
    "any.required": "Category ID is required",
    "string.length": "Invalid Category ID length",
  }),
  name: Joi.string().optional(),
  category: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

const getBlogsCategoryById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});


const deleteBlogsCategory = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addBlogsCategory,
  updateBlogsCategory,
  getBlogsCategoryById,
  deleteBlogsCategory,
};
