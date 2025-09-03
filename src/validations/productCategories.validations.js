const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");


const createCategory = Joi.object({
  
    title: Joi.string()
      .required()
      .min(2)
      .max(100)
      .trim()
      .messages({
        "string.empty": "Category title is required",
        "string.min": "Category title must be at least 2 characters long",
        "string.max": "Category title cannot exceed 100 characters",
        "any.required": "Category title is required",
      }),

    category: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-z0-9-]+$/)
      .trim()
      .optional()
      .messages({
        "string.min": "Category slug must be at least 2 characters long",
        "string.max": "Category slug cannot exceed 50 characters",
        "string.pattern.base":
          "Category slug can only contain lowercase letters, numbers, and hyphens",
      }),

    description: Joi.string()
      .required()
      .min(10)
      .max(500)
      .trim()
      .messages({
        "string.empty": "Category description is required",
        "string.min": "Category description must be at least 10 characters long",
        "string.max": "Category description cannot exceed 500 characters",
        "any.required": "Category description is required",
      }),

   image: Joi.any(), // handle file separately
  icon: Joi.any()
  
});


const updateCategory = Joi.object({
      id: idParam.required().messages({
      'string.pattern.name': 'Invalid category ID format',
      'any.required': 'Category ID is required'
    }),
    title: Joi.string().min(2).max(100).trim().optional().messages({
      "string.min": "Category title must be at least 2 characters long",
      "string.max": "Category title cannot exceed 100 characters",
    }),
    category: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-z0-9-]+$/)
      .trim()
      .optional()
      .messages({
        "string.min": "Category slug must be at least 2 characters long",
        "string.max": "Category slug cannot exceed 50 characters",
        "string.pattern.base":
          "Category slug can only contain lowercase letters, numbers, and hyphens",
      }),
    description: Joi.string().optional().min(10).max(500).trim().messages({
      "string.min": "Category description must be at least 10 characters long",
      "string.max": "Category description cannot exceed 500 characters",
    }),
   image: Joi.any(), // handle file separately
  icon: Joi.any()
});


const getCategoryById = Joi.object({
  params: Joi.object({
    id: idParam.required().messages({
      "string.pattern.name": "Invalid category ID format",
      "any.required": "Category ID is required",
    }),
  }),
});


const deleteCategory = Joi.object({
  params: Joi.object({
    id: idParam.required().messages({
      "string.pattern.name": "Invalid category ID format",
      "any.required": "Category ID is required",
    }),
  }),
});

module.exports = {
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
};
