const Joi = require("joi");


const idParam = Joi.string().hex().length(24).label("MongoId");


const contentItemSchema = Joi.object({
  heading: Joi.string()
    .required()
    .messages({
      "string.empty": "Content heading is required",
      "any.required": "Content heading is required",
    }),
  para: Joi.string()
    .required()
    .messages({
      "string.empty": "Content paragraph is required",
      "any.required": "Content paragraph is required",
    }),
});


const createBlog = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "Blog name is required",
    "any.required": "Blog name is required",
  }),
  slug: Joi.string()
.optional()
    .pattern(/^[a-z0-9-]+$/)
    .trim()
    .messages({
      "string.empty": "Slug is required",
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  title: Joi.string().required().trim().messages({
    "string.empty": "Title is required",
  }),
  excerpt: Joi.string().required().trim().messages({
    "string.empty": "Excerpt is required",
  }),
  content: Joi.array()
    .items(contentItemSchema)
    .min(1)
    .required()
    .messages({
      "array.min": "At least one content block is required",
      "any.required": "Content is required",
    }),
  author: Joi.string().required().messages({
    "string.empty": "Author is required",
  }),
  authorRole: Joi.string().allow(null).optional(),
  authorImage: Joi.any(),
  date: Joi.date().optional().messages({
    "date.base": "Date must be a valid date",
  }),
  publishedAt: Joi.date().optional().messages({
    "date.base": "PublishedAt must be a valid date",
  }),
  readTime: Joi.string().allow(null).optional(),
  categoryId: idParam.required().messages({
    "any.required": "Category ID is required",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  image: Joi.any(),
  views: Joi.number().integer().default(0),
  likes: Joi.number().integer().default(0),
  comments: Joi.number().integer().default(0),
  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be true or false",
  }),
  featured: Joi.boolean().required().messages({
    "boolean.base": "featured must be true or false",
  }),
});


const updateBlog = Joi.object({
  id: idParam.required().messages({
    "any.required": "Blog ID is required",
  }),
  name: Joi.string().optional(),
  slug: Joi.string()
    .pattern(/^[a-z0-9-]+$/)
    .trim()
    .optional()
    .messages({
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  title: Joi.string().optional(),
  excerpt: Joi.string().optional(),
  content: Joi.array().items(contentItemSchema).optional(),
  author: Joi.string().optional(),
  authorRole: Joi.string().allow(null).optional(),
  authorImage: Joi.any(),
  date: Joi.date().optional(),
  publishedAt: Joi.date().optional(),
  readTime: Joi.string().allow(null).optional(),
  categoryId: idParam.optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  image: Joi.any(),
  views: Joi.number().integer().optional(),
  likes: Joi.number().integer().optional(),
  comments: Joi.number().integer().optional(),
  isActive: Joi.boolean().optional(),
  featured: Joi.boolean().optional(),
});


const getBlogById = Joi.object({
  params: Joi.object({
    id: idParam.required().messages({
      "any.required": "Blog ID is required",
    }),
  }),
});


const deleteBlog = Joi.object({
  params: Joi.object({
    id: idParam.required().messages({
      "any.required": "Blog ID is required",
    }),
  }),
});

const getByNameBlog = Joi.object({
  params: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Blog Name is required",
      "string.empty": "Blog Name cannot be empty",
    }),
  }),});

module.exports = {
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getByNameBlog
};
